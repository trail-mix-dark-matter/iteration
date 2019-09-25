const { Pool } = require('pg');
const pool = new Pool({
  connectionString:
    'postgres://rujfxqjg:X_2CBQyYkBulGgWOIBuD8gUWpvbAFvkR@otto.db.elephantsql.com:5432/rujfxqjg'
});

const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');

// get favorites
const getFavorites = (req, res, next) => {
  const username = req.body.username;
  const queryForFavorites = `SELECT trailid FROM favorites WHERE username = $1`;
  const queryArray = [username];

  pool.query(queryForFavorites, queryArray, (error, favorites) => {
    if (error) return error;
    res.locals.favorites = favorites.rows;
    return next();
  });
};

// add favorite
const addFavorite = (req, res, next) => {
  const username = req.body.username;
  const trailid = req.body.trailid;
  const queryForFavorite = `INSERT INTO favorites (username, trailid) VALUES ($1, $2)`;
  const queryArray = [username, trailid];

  pool.query(queryForFavorite, queryArray, error => {
    if (error) return next(err);
    res.end();
  });
};

// query fetching all comments for specific trails
const getComment = (req, res, next) => {
  const trailid = req.headers.id;

  pool.query(
    'SELECT * FROM comments WHERE trailid = $1',
    [trailid],
    (error, results) => {
      if (error) throw error;
      res.locals.comments = results.rows;
      return next();
    }
  );
};

//query posting new comment to DB and then fetching all comments including the one just posted
const postComment = (req, res, next) => {
  const trailid = req.body.id;
  const username = req.body.author;
  const comment = req.body.comment;

  if (username && comment && trailid) {
    pool.query(
      'INSERT INTO comments (username, comment, trailid) VALUES ($1, $2, $3)',
      [username, comment, trailid],
      (error, results) => {
        if (error) throw error;
        pool.query(
          'SELECT * FROM comments where trailid = $1',
          [trailid],
          (error, results) => {
            if (error) throw error;
            res.locals.comments = results.rows;
            return next();
          }
        );
      }
    );
  }
};

//add user and bcrypt password to database
const createUser = (req, res, next) => {
  const { username, password } = req.body;
  if (username && password) {
    pool.query(
      'SELECT * from users WHERE username = $1',
      [username],
      (err, results) => {
        if (results.rows.length === 0) {
          bcrypt.hash(password, SALT_WORK_FACTOR, (err, hash) => {
            if (err) throw err;
            pool.query(
              'INSERT INTO users (username, password) VALUES ($1, $2) returning *',
              [username, hash],
              (error, results) => {
                if (error) throw error;
                res.locals.verified = true;
                return next();
              }
            );
          });
        } else {
          res.locals.verified = false;
          return next();
        }
      }
    );
  }
};

// query username and password and see if matches are in the database
const verifyUser = (req, res, next) => {
  const { username, password } = req.body;

  pool.query(
    'SELECT password FROM users where username = $1',
    [username],
    (error, results) => {
      if (error) throw error;
      if (results.rows.length) {
        bcrypt.compare(password, results.rows[0].password, (err, isMatch) => {
          if (err) return err;
          if (!isMatch) {
            res.locals.verified = false;
            return next();
          } else {
            res.locals.verified = true;
            return next();
          }
        });
      } else {
        res.locals.verified = false;
        return next();
      }
    }
  );
};

module.exports = {
  getFavorites,
  addFavorite,
  getComment,
  verifyUser,
  createUser,
  postComment
};
