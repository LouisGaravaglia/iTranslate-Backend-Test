require("dotenv").config();

const PORT = +process.env.PORT || 3001;

let DB_URI;

if (process.env.NODE_ENV === "test") {
  DB_URI = "postgresql:///itranslatedb_test";
} else {
  DB_URI  = process.env.DATABASE_URL || "postgresql:///itranslatedb";
}

console.log("Using database", DB_URI);

module.exports = {
  PORT,
  DB_URI,
};
