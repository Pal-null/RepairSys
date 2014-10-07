@echo off
Echo mkdir test_report
gocov test controllers/demo | gocov-html > test_report/controller_demo_demo_test.html
gocov test controllers/unitManager | gocov-html > test_report/controller_unitManager_projectmanager_test.html
gocov test models/persistence/unitManager | gocov-html > test_report/controller_unitManager_projectmanager_persis_test.html
gocov test models/persistence/repair | gocov-html > test_report/models_repair_test.html