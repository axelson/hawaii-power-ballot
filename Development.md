# Development Setup

Install postgres (on Mac you can use Postgres.app)
Install npm and node.js (https://nodejs.org/en/)

Run these commands:

    npm install -g knex
    npm install
    npm start
    createdb power_ballot_development
    knex migrate:latest
    node server/update_data.js
    node server/insert_candidate_metadata.js

# Production Deploys

    heroku pg:push power_ballot_development DATABASE_URL --app power-ballot

# Exporting data to volunteer seed CSV

In postgres shell (psql) run the following:

    \COPY (select c."Candidate_Name" as candidate_name, c."Candidate_Party" as party, cm.cand_website_url as cand_website_url, cm.cand_facebook_url as cand_facebook_url, cm.cand_twitter_url as cand_twitter_url, cm.cand_email as cand_email_address, cm."CC_Reg_No" as cc_registration_number, cm."FEC_CC_ID" as fec_cc_id, cm.cb_website_url as civil_beat_url, cm.lwv_website_url as lwv_url, cm.staradvertiser_url as staradvertiser_url, cm.photo_url as candidate_photo_url from candidates c join candidate_metadata cm on cm."Candidate_ID" = c."Candidate_ID") TO 'volunteer_seed.csv' DELIMITER ',' CSV HEADER;

Then modify the seed file to have absolute references to the locally hosted kanu files by opening the csv and running this command in vim: 

    %s/\/assets\/kanu/http:\/\/www.hawaiipowerballot.com\/assets\/kanu/g
