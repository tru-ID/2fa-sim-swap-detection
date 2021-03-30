const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, VERIFICATION_SID } = process.env;
const { ensureLoggedIn } = require("connect-ensure-login");
const express = require("express");
const twilio = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
const logger = require("../logger")();
const { createAccessToken } = require("../helpers/createAccessToken");
const { performSimCheck } = require("../helpers/performSimCheck");
const router = express.Router();
// function for handling if the SIMCheck was successful , if the user has successfully performed the SIMCheck before and if the user is older than 7 days
const passSIMCheck = function (user, no_sim_change) {
  const sevenDaysMilliseconds = 7 * 24 * 60 * 60 * 1000;

  if (no_sim_change) return true;
  if (user.fullyVerified) return false;
  if (Date.now() - user.createdAt > sevenDaysMilliseconds) return false;
  return true;
};


const { createAccessToken } = require('../helpers/createAccessToken');
const { performSimCheck } = require('../helpers/performSimCheck');

const passSIMCheck = function (user, noSimChange) {
  const sevenDaysMilliseconds = 7 * 24 * 60 * 60 * 1000;

  if (noSimChange) return true;
  if (user.fullyVerified) return false;
  if (Date.now() - user.createdAt > sevenDaysMilliseconds) return false;
  return true;
};

router.get('/', ensureLoggedIn(), async (req, res) => {
  if (req.user.role !== 'access secret content') {

    const errors = { wasValidated: false };
    const channel = req.user.verificationMethod;
    let verificationRequest;

    try {
      //create tru.ID access token
      const accessToken = await createAccessToken();
      console.log(accessToken);

      // perform SIMCheck

      const noSimChange = await performSimCheck(
        req.user.phoneNumber.replace(/\s+/g, ''),
        accessToken,
      );
      console.log(noSimChange);

      // If the SIM has changed within 7 days, the user has not successfully performed a SIMCheck before
      // and the user is older than 7 days we render our `sim-changed` view
      if (passSIMCheck(req.user, noSimChange) === false) {
        return res.render('sim-changed', {
          error: 'Cannot proceed. SIM changed too recently ❌',
        });
      }
      
      if (!req.user.fullyVerified) {

        req.user.fullyVerified = true;
        await req.user.save();
      }

      // every other scenario i.e. sim changed but the user isn't up to 7 days or
      verificationRequest = await twilio.verify
        .services(VERIFICATION_SID)
        .verifications.create({ to: req.user.phoneNumber, channel });
    } catch (e) {
      logger.error(e);
      return res.status(500).send(e);
    }

    logger.debug(verificationRequest);

    return res.render("verify", { title: "Verify", user: req.user, errors });
  }


  throw new Error('User already has `access secret content` role.');
})


router.post("/", ensureLoggedIn(), async (req, res) => {
  const { verificationCode: code } = req.body;
  console.log(code);
  console.log(req.user.phoneNumber);
  let verificationResult;
  const errors = { wasValidated: true };

  try {
    verificationResult = await twilio.verify
      .services(VERIFICATION_SID)
      .verificationChecks.create({ code, to: req.user.phoneNumber });
  } catch (e) {
    logger.error(e);
    return res.status(500).send(e);
  }

  logger.debug(verificationResult);

  if (verificationResult.status === "approved") {
    req.user.role = "access secret content";
    await req.user.save();
    return res.redirect("/");
  }

  errors.verificationCode = `Unable to verify code. status: ${verificationResult.status}`;
  return res.render("verify", { title: "Verify", user: req.user, errors });
});

module.exports = router;
