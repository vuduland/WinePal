USE wine_db;

CREATE TABLE history(
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  wine INTEGER(11) NOT NULL,
  user INTEGER(11) NOT NULL,
  purchase_date DATE,
  notes VARCHAR(100),
  personal_rating VARCHAR(100),
  ageability_index INTEGER(11),
  PRIMARY KEY (id)
);
