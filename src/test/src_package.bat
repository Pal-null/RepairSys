@echo off
Echo mkdir test_report
mkdir test_report
gocov test controllers/demo | gocov-html > test_report/controller_demo_demo_test.html
