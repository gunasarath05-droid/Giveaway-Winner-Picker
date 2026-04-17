#!/usr/bin/env bash
# exit on error
set -o errexit

echo "--- Installing Dependencies ---"
pip install -r requirements.txt

echo "--- Collecting Static Files ---"
python manage.py collectstatic --no-input

echo "--- Running Migrations ---"
python manage.py migrate --no-input

echo "--- Setting up Admin Account ---"
python scripts/setup_admin.py

echo "--- Build Process Complete ---"
