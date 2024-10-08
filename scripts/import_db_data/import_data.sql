CREATE TABLE IF NOT EXISTS institution (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS applicant (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS "grant" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(128) NOT NULL,
    description TEXT,
    "institutionId" INTEGER,
    "grantAmount" INTEGER NOT NULL,
    "startingAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deadlineAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    location TEXT,
    "fundingAreas" TEXT[],
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE "grant" ADD CONSTRAINT FK_grant_institution FOREIGN KEY ("institutionId") REFERENCES institution(id);

-- APPLICANT GRANT FEEDBACK
CREATE TABLE IF NOT EXISTS applicant_grant_feedback (
    id SERIAL PRIMARY KEY,
    "grantId" INTEGER,
    "applicantId" INTEGER,
    positive BOOLEAN NOT NULL,
    feedback TEXT NOT NULL,
    "appliedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE applicant_grant_feedback ADD CONSTRAINT FK_applicant_grant_feedback_grant FOREIGN KEY ("grantId") REFERENCES "grant"(id);

ALTER TABLE applicant_grant_feedback ADD CONSTRAINT FK_applicant_grant_feedback_applicant FOREIGN KEY ("applicantId") REFERENCES "applicant"(id);

-- Clearing up db before inserting new values [TEST SETUP ONLY]

TRUNCATE TABLE applicant RESTART IDENTITY CASCADE;

TRUNCATE TABLE institution RESTART IDENTITY CASCADE;

TRUNCATE TABLE "grant" RESTART IDENTITY CASCADE;

TRUNCATE TABLE applicant_grant_feedback RESTART IDENTITY CASCADE;

-- INSTITUTIONS
INSERT INTO
  institution (id, name, description)
VALUES
  (1, 'Dribble Foundation', '');

INSERT INTO
  institution (id, name, description)
VALUES
  (2, 'Robinson Foundation', '');

INSERT INTO
  institution (id, name, description)
VALUES
  (3, 'Looking Out Foundation', '');

INSERT INTO
  institution (id, name, description)
VALUES
  (4, 'Walki Foundation', '');

-- APPLICANTS
INSERT INTO
  applicant (id, name, description)
VALUES
  (1, 'test1', '');

-- GRANTS
INSERT INTO
  "grant" (
    id,
    "institutionId",
    name,
    description,
    "grantAmount",
    "startingAt",
    "deadlineAt",
    location,
    "fundingAreas",
    "createdAt",
    "updatedAt"
  )
VALUES
  (
    1,
    3,
    'Looking Out',
    '',
    100000,
    '2024-09-29 19:10:25+01',
    '2024-10-20 09:10:25+01',
    'Wilmingtone, Delaware',
    '{"Public Health Women","Culture food","Medical Assistance","Environment Art"}',
    '2024-09-29 19:10:25+01',
    '2024-09-29 19:10:25+01'
  );

INSERT INTO
  "grant" (
    id,
    "institutionId",
    name,
    description,
    "grantAmount",
    "startingAt",
    "deadlineAt",
    location,
    "fundingAreas",
    "createdAt",
    "updatedAt"
  )
VALUES
  (
    2,
    2,
    'Robinson Foundation Grant',
    '',
    25000,
    '2024-09-29 19:10:25+01',
    '2024-10-20 09:10:25+01',
    'Wilmingtone, Delaware',
    '{"Public Health Women","Culture food","Medical Assistance","Environment Art"}',
    '2024-09-29 19:10:25+01',
    '2024-09-29 19:10:25+01'
  );

INSERT INTO
  "grant" (
    id,
    "institutionId",
    name,
    description,
    "grantAmount",
    "startingAt",
    "deadlineAt",
    location,
    "fundingAreas",
    "createdAt",
    "updatedAt"
  )
VALUES
  (
    3,
    1,
    'Dribble Foundation Grant',
    '',
    75000,
    '2024-09-29 19:10:25+01',
    '2024-10-20 09:10:25+01',
    'Wilmingtone, Delaware',
    '{"Public Health Women","Culture food","Medical Assistance","Environment Art"}',
    '2024-09-29 19:10:25+01',
    '2024-09-29 19:10:25+01'
  );

INSERT INTO
  "grant" (
    id,
    "institutionId",
    name,
    description,
    "grantAmount",
    "startingAt",
    "deadlineAt",
    location,
    "fundingAreas",
    "createdAt",
    "updatedAt"
  )
VALUES
  (
    4,
    4,
    'Walki wako Foundation Grant',
    '',
    130000,
    '2024-09-29 19:10:25+01',
    '2024-10-20 09:10:25+01',
    'Wilmingtone, Delaware',
    '{"Public Health Women","Culture food","Medical Assistance","Environment Art"}',
    '2024-09-29 19:10:25+01',
    '2024-09-29 19:10:25+01'
  );

INSERT INTO
  "grant" (
    id,
    "institutionId",
    name,
    description,
    "grantAmount",
    "startingAt",
    "deadlineAt",
    location,
    "fundingAreas",
    "createdAt",
    "updatedAt"
  )
VALUES
  (
    5,
    3,
    '[New] Looking Out',
    '',
    100000,
    '2024-09-29 19:10:25+01',
    '2024-10-20 09:10:25+01',
    'Wilmingtone, Delaware',
    '{"Public Health Women","Culture food","Medical Assistance","Environment Art"}',
    '2024-09-29 19:10:25+01',
    '2024-09-29 19:10:25+01'
  );

INSERT INTO
  "grant" (
    id,
    "institutionId",
    name,
    description,
    "grantAmount",
    "startingAt",
    "deadlineAt",
    location,
    "fundingAreas",
    "createdAt",
    "updatedAt"
  )
VALUES
  (
    6,
    2,
    '[New] Robinson Foundation Grant',
    '',
    25000,
    '2024-09-29 19:10:25+01',
    '2024-10-20 09:10:25+01',
    'Wilmingtone, Delaware',
    '{"Public Health Women","Culture food","Medical Assistance","Environment Art"}',
    '2024-09-29 19:10:25+01',
    '2024-09-29 19:10:25+01'
  );

INSERT INTO
  "grant" (
    id,
    "institutionId",
    name,
    description,
    "grantAmount",
    "startingAt",
    "deadlineAt",
    location,
    "fundingAreas",
    "createdAt",
    "updatedAt"
  )
VALUES
  (
    7,
    1,
    '[New] Dribble Foundation Grant',
    '',
    75000,
    '2024-09-29 19:10:25+01',
    '2024-10-20 09:10:25+01',
    'Wilmingtone, Delaware',
    '{"Public Health Women","Culture food","Medical Assistance","Environment Art"}',
    '2024-09-29 19:10:25+01',
    '2024-09-29 19:10:25+01'
  );

INSERT INTO
  "grant" (
    id,
    "institutionId",
    name,
    description,
    "grantAmount",
    "startingAt",
    "deadlineAt",
    location,
    "fundingAreas",
    "createdAt",
    "updatedAt"
  )
VALUES
  (
    8,
    4,
    '[New] Walki wako Foundation Grant',
    '',
    130000,
    '2024-09-29 19:10:25+01',
    '2024-10-20 09:10:25+01',
    'Wilmingtone, Delaware',
    '{"Public Health Women","Culture food","Medical Assistance","Environment Art"}',
    '2024-09-29 19:10:25+01',
    '2024-09-29 19:10:25+01'
  );