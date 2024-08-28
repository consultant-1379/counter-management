RUN COUNTER MANAGEMENT
======================

###Below commands must be run from root directory of a project 
######Maven, nodejs and cdt2 must be present in system


<br>

- To simply build project and skip tests

  > sh build.sh

<br>

- To build the project and run the testware, add **test** argument

   > sh build.sh **test**  

<br>

- To build and run testware only, skipping the UI build, add **skip_ui** argument

  > sh build.sh **test skip_ui**
