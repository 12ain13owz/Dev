const db = require("../models/_index");

track = async (req, res, next) => {
  try {
    const year = req.year.toString();
    const y = Number(year.substring(2));
    const item_seq = await db.item_seq.findOne({
      where: {
        category_id: req.body.category_id,
        year: y,
      },
    });

    if (!item_seq) {
      const resutl = await db.item_seq.create({
        sequence: 1,
        year: y,
        category_id: req.body.category_id,
      });

      req.track = `${req.body.category_code}${resutl.year.toString()}0000${
        resutl.sequence
      }`;

      return next();
    }

    if (item_seq.year != y) {
      const resutl = await db.item_seq.create({
        sequence: 1,
        year: y,
        category_id: req.body.category_id,
      });

      req.track = `${req.body.category_code}${resutl.year.toString()}0000${
        resutl.sequence
      }`;

      return next();
    }

    const sequence = item_seq.sequence + 1;
    await db.item_seq.update(
      { sequence: sequence },
      {
        where: {
          year: y,
          category_id: req.body.category_id,
        },
      }
    );

    const count = 5 - sequence.toString().length;
    let no = "";

    for (let i = 0; i < count; i++) {
      no += "0";
    }

    const seq = `${no}${sequence.toString()}`;
    req.track = `${req.body.category_code}${y.toString()}${seq}`;

    next();
  } catch (error) {
    console.log("Error track : ", error.message);

    if (error.status) return res.status(error.status).send(error.message);
    res.status(500).send(db.errorMessage);
  }
};

yearNow = async (req, res, next) => {
  try {
    req.year = new Date().getFullYear() + 543;
    next();
  } catch (error) {
    console.log("Error year : ", error.message);

    if (error.status) return res.status(error.status).send(error.message);
    res.status(500).send(db.errorMessage);
  }
};

const generate = {
  yearNow: yearNow,
  track: track,
};

module.exports = generate;
