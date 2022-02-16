const router = require("express").Router();
var path = require("path");
const { User, Sentence } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  if (req.session.logged_in) {
    res.render("game", {
      logged_in: req.session.logged_in,
    });
    return;
  } else {
    res.redirect("/login");
  }
});

// get the user's sentences
router.get("/sentence", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Sentence }],
    });

    const user = userData.get({ plain: true });

    res.render("sentence", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/game", async (req, res) => {
  if (req.session.logged_in) {
    res.render("game", {
      logged_in: req.session.logged_in,
    });
    return;
  } else {
    res.redirect("/login");
    return;
  }
  // res.render("game");
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.render("game", {
      logged_in: req.session.logged_in,
    });
    return;
  } else {
    res.render("login");
    return;
  }
});

module.exports = router;