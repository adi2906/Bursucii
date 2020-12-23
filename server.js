// 1:37:10
const express = require("express");
const bodyParser = require("body-parser");
const Sequelize = require("sequelize");

const sequelize = new Sequelize("bursucii", "root", "", {
  dialect: "mysql",
});

const Professor = sequelize.define("professor", {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [3, 20],
    },
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [3, 20],
    },
  },
  subject: {
    type: Sequelize.ENUM,
    allowNull: false,
    values: ["MATHEMATICS", "PROGRAMMING", "PHYSICS", "CHEMISTRY", "SCIENCE"],
  },
  experience: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    },
  },
});

const Student = sequelize.define("student", {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [3, 20],
    },
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [3, 20],
    },
  },
  absences: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 50,
    },
  },
});

Professor.hasMany(Student);

const app = express();
app.use(bodyParser.json());

//create
app.get("/create", async (req, res, next) => {
  try {
    await sequelize.sync({ force: true });
    res.status(201).json({ message: "created" });
  } catch (err) {
    next(err);
  }
});
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~PROFESSORS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//List of Professors
app.get("/professors", async (req, res, next) => {
  try {
    const professors = await Professor.findAll();
    res.status(200).json(professors);
  } catch (err) {
    next(err);
  }
});

//Add a Professor
app.post("/professors", async (req, res, next) => {
  try {
    await Professor.create(req.body);
    res.status(201).json({ message: "A professor has been added." });
  } catch (err) {
    next(err);
  }
});
//Get a Professor
app.get("/professors/:pid", async (req, res, next) => {
  try {
    const professor = await Professor.findByPk(req.params.pid);
    if (professor) {
      res.status(200).json(professor);
    } else {
      res.status(404).json({
        message: "Professor with ID:" + req.params.pid + " was not found.",
      });
    }
  } catch (err) {
    next(err);
  }
});

//Modify a Professor
app.put("/professors/:pid", async (req, res, next) => {
  try {
    const professor = await Professor.findByPk(req.params.pid);
    if (professor) {
      await professor.update(req.body);
      res.status(202).json({
        message:
          "Professor with ID:" +
          req.params.pid +
          " has been succesfully modified.",
      });
    } else {
      res.status(404).json({ message: "Professor not found." });
    }
  } catch (err) {
    next(err);
  }
});

//Delete a Professor
app.delete("/professors/:pid", async (req, res, next) => {
  try {
    const professor = await Professor.findByPk(req.params.pid);
    if (professor) {
      await professor.destroy();
      res.status(202).json({
        message:
          "Professor with ID:" +
          req.params.pid +
          " has been succesfully deleted.",
      });
    } else {
      res.status(404).json({ message: "Professor not found." });
    }
  } catch (err) {
    next(err);
  }
});
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~STUDENTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//List of Students
app.get("/professors/:pid/students", async (req, res, next) => {
  try {
    const professor = await Professor.findByPk(req.params.pid, {
      include: [Student],
    });
    if (professor) {
      res.status(200).json(professor.students);
    } else {
      res.status(404).json({ message: "Error-list of Students" });
    }
  } catch (err) {
    next(err);
  }
});
//Add a Student
app.post("/professors/:pid/students", async (req, res, next) => {
  try {
    const professor = await Professor.findByPk(req.params.pid);
    if (professor) {
      const student = new Student(req.body);
      student.professorId = professor.id;
      await student.save();
      res.status(201).json({ message: "A student has been added." });
    } else {
      res.status(404).json({ message: "Error adding the student" });
    }
  } catch (err) {
    next(err);
  }
});
//Get a Student
app.get("/professors/:pid/students/:sid", async (req, res, next) => {
  try {
    const professor = await Professor.findByPk(req.params.pid);
    if (professor) {
      const students = await professor.getStudents({
        where: { id: req.params.sid },
      });
      const student = students.shift();
      if (student) {
        res.status(200).json(student);
      } else {
        res.status(404).json({
          message: "Student with ID:" + req.params.sid + " was not found.",
        });
      }
    } else {
      res.status(404).json({
        message: "Student with ID:" + req.params.sid + " was not found.",
      });
    }
  } catch (err) {
    next(err);
  }
});

//Modify a Student
app.put("/professors/:pid/students/:sid", async (req, res, next) => {
  try {
    const professor = await Professor.findByPk(req.params.pid);
    if (professor) {
      const students = await professor.getStudents({
        where: { id: req.params.sid },
      });
      const student = students.shift();
      if (student) {
        await student.update(req.body);
        res.status(202).json({
          message:
            "Student with ID:" +
            req.params.sid +
            " has been succesfully modified.",
        });
      } else {
        res.status(404).json({
          message: "Student with ID:" + req.params.sid + " was not found.",
        });
      }
    } else {
      res.status(404).json({
        message: "Student with ID:" + req.params.sid + " was not found.",
      });
    }
  } catch (err) {
    next(err);
  }
});

//Delete a Student
app.delete("/professors/:pid/students/:sid", async (req, res, next) => {
  try {
    const professor = await Professor.findByPk(req.params.pid);
    if (professor) {
      const students = await professor.getStudents({
        where: { id: req.params.sid },
      });
      const student = students.shift();
      if (student) {
        await student.destroy();
        res.status(202).json({
          message:
            "Student with ID:" +
            req.params.sid +
            " has been succesfully deleted.",
        });
      } else {
        res.status(404).json({
          message: "Student with ID:" + req.params.sid + " was not found.",
        });
      }
    } else {
      res.status(404).json({
        message: "Student with ID:" + req.params.sid + " was not found.",
      });
    }
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.warn(err);
  res.status(500).json({ message: "Server Error" });
});

app.listen(8080);
