# Student-Data-WebApp
A web application to send marketing emails to the target audience.
Developed using ExpressJS and Sequelize. NodeMailer was used to send the email.
Sequelize was used to query over the databse which is stored in a mySQL table.

After logging we have three options wherein in the dashboard first we have the stats of number of students in all the different branches
![](public/Images/Screenshot%20(89).png)

Then a simple guide page which displays the full form of all the branches available
![](public/Images/Screenshot%20(91).png)

Finally we have the main web page which provides us with all the different checkboxes which we can use to filter out the students and give us the resulting filtered table.
![](public/Images/Screenshot%20(92).png)

![](public/Images/Screenshot%20(93).png)

After clicking the filter button the loader first shows filtering which is done using Sequelize 
![](public/Images/Screenshot%20(94).png)

And then page shows the number of students found and all the data available in the form of a table
![](public/Images/Screenshot%20(95).png)

Once the data is shown we can click on the email of any student which would then give us an option of choosing the email template we want to use.
![](public/Images/Screenshot%20(96).png)

After choosing the template, the marketing member can write the subject and he would be able to see the contents of the HTML file that would be send to the student and any last minute changes can be done.
![](public/Images/Screenshot%20(97).png)

After hitting the send button, we recieve a confirmation message that the email was succesfully sent.
![](public/Images/Screenshot%20(98).png)
