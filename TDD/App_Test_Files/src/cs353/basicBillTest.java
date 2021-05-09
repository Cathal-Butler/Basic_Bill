//CS353 GROUP NINE PROJECT BASIC BILL
//TEAM MEMBERS: CONOR TRESTON, PAVEL PROSHKOVICH, SINEAD KILMURRAY, DI YUN YAO
//TEST DRIVEN DEVELOPMENT: EXPENSES SECTION
//PURPOSE OF TESTING: 
	//(1). ENSURES THAT USERS ARE UNABLE TO LEAVE EITHER AN EXPENSE AMOUNT OR EXPENSE DATE BLANK
	//(2). ENSURES USERS ARE UNABLE TO ENTER TEXT INTO EITHER EXPENSE INPUT OR EXPENSE DATE
	//(3). ENSURES USERS CANNOT ENTER A FUTURE DATE OF EXPENSE

//NOTES FOR TESTER:
//Expense Component should be switched to basic testing template expense component which renders valid/invalid to screen
//The CodeSandbox Project URL should be changed to ensure the current version with expense template component is being tested


package cs353;

import org.testng.annotations.AfterClass;
import org.testng.annotations.Test;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.BeforeClass;
import org.testng.AssertJUnit;
import org.testng.ITestNGMethod;
import org.testng.ITestResult;
import org.testng.annotations.*;

import static org.testng.Assert.*;
import static org.testng.AssertJUnit.assertEquals;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.concurrent.TimeUnit;
import java.util.logging.Level;

import org.apache.commons.io.FileUtils;
import org.openqa.selenium.By;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Wait;
import org.openqa.selenium.support.ui.WebDriverWait;

import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;
import org.openqa.selenium.firefox.FirefoxProfile;
import org.openqa.selenium.remote.DesiredCapabilities;

public class basicBillTest {

	static WebDriver driver;
	static Wait<WebDriver> wait;
	static String url="https://obbyy.csb.app/option2"; //Inserted CodeSandbox Project URL
	
	
	@BeforeClass
	public void setupDriver() throws Exception {
		System.out.println("CS353 Group Nine Basic Bill Testing Started At:: " + LocalDateTime.now());
		System.out.println("CS353 Basic Bill Application URL: " + url);
		System.out.println();
		System.setProperty("webdriver.chrome.driver","C:\\\\\\\\Users\\\\\\\\catha\\\\\\\\Downloads\\\\\\\\\\\\\\\\chromedriver_win32\\\\\\\\chromedriver.exe"); //Referred to Chrome Driver Path
		driver = new ChromeDriver();
		// Create wait
		wait = new WebDriverWait( driver, 50 ); //Allowing 50 seconds so tester has appropriate time to login and locate the correct page 
		// Open web page
		driver.get( url );
	}

	@AfterClass
	public void shutdown() {
		driver.close();
		driver.quit(); // close the drivers
		System.out.println("CS353 Group Nine Basic Bill Testing Finished At: " + LocalDateTime.now());
	}
	
	@BeforeMethod
	public void setUp() throws Exception {
		driver.get(url);
	    // wait until displayed; page is fully loaded when submit button appears
	    wait.until(ExpectedConditions.presenceOfElementLocated(By.id("expenseDate"))); //Once this loads, the input elements are present and the testing can begin
	} 
	
	/* This is a useful method that takes a time-stamped screenshot
	 * automatically of ANY test that fails. It will take a .PNG screenshot of the 
	 * web-browser in the state that causes the failure. 
	 * The PNG file is written directly to your Eclipse workspace where the folder 
	 * for this project is stored. 
	 * The annotation @AfterMethod means that it will ONLY RUN after a 
	 * test method has been run. */
    @AfterMethod
    public void takeScreenShotOnFailure(ITestResult testResult) throws IOException {
        if (testResult.getStatus() == ITestResult.FAILURE) {
            System.out.println(testResult.getStatus());
            // Create a unique filename with the current timestamp in mm-ss resolution
            ITestNGMethod method = testResult.getMethod();
            String methodName = method.getMethodName();
            System.out.println("**************" + method.getDescription());
            String fn = new SimpleDateFormat("yyyy-MM-dd-HH-mm-ss").format(new Date()).toString();
            fn =  methodName + "_Lab11_FailedTest_" + fn + ".png";
            File screenshotFile = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
            FileUtils.copyFile(screenshotFile, new File(fn));
        }
    }

	public static void expenseInputTestTemplate(String s1,String s2, String expectedAns){
		System.out.println("START: Testing Next Input "); 
		driver.findElement(By.id("expenseAmount")).sendKeys(s1); //Inserted element ID for expense input box
		driver.findElement(By.id("expenseDate")).sendKeys(s2);  //Inserted element ID for date input

        // The result 'valid/invalid' appears in a Div #testResult and this is located below
		String answerGenerated = driver.findElement(By.id("testResult")).getText(); //Inserted element ID of testResult
        System.out.println("The output of the test is:  [" + answerGenerated + "]");
    
        // This is where we put the expected output of our test
        // based on our input above. 
      String expectedAnswer = expectedAns;
    
        // Write some stuff to the console. 
      // Write some stuff to the console. 
      System.out.println("Basic Bill Testing: The expected output of the test is:  [" + expectedAnswer + "]");

        // Wait for four seconds so you can physically see the output
        try {
        	Thread.sleep(400);
        	System.out.println("Test Ran, continuing to next Test Case: ");
        } catch (InterruptedException e) {
        	e.printStackTrace();
	    }
        
	    // Compare the expected answer with real answer
		// Report a failure if this is the case
        	AssertJUnit.assertEquals(expectedAnswer,answerGenerated);
	}

	// Create a DATA PROVIDER for valid data. 
	// Note that the structure of the multidimensional array has the same order 
	// as the input parameters for both the data provider methods and the template 
	// method.		
	@DataProvider(name="validExpenseData")
	public static Object[][] createValidExpenseData() {
		// Test Input data is added here 
		Object[][] validData = {
				//Term 1 is the Expense Amount, Term 2 is the Date, Term 3 is the expected Output
				{"10", "08/04/2021", "Valid"}, //Valid TC1 
				{"110", "07/04/2021", "Valid"}, //Valid TC2
				{"55", "06/03/2021", "Valid"}, //Valid TC3
				{"", "06/03/2021", "Invalid"}, //Valid TC4
				{"100", "12/12/2022", "Invalid"}, //Invalid TC5 (Date is in the future)
				{"-100", "01/01/2021", "Invalid"}, //Invalid TC6 (Expense is a negative number)
				{"100", "", "Invalid",}, //Invalid TC7 (Date is empty)
		};
		return validData;
	}
	
	// Create a DATA PROVIDER for invalid Data.
	// Note that the structure of the multidimensional array has the same order 
	// as the input parameters for both the data provider methods and the template method.  
	@DataProvider(name="invalidExpenseData")
	public static Object[][] createInvalidExpenseData() {
		// Test Input data is added here 
		Object[][] invalidData = {
				//Term 1 is the Expense Amount, Term 2 is the Date, Term 3 is the expected Output
				{"hello", "20/02/2017", "Invalid"}, //Invalid TC8 (incorrect expense input format)
				{"270", "textInput", "Invalid"}, //Invalid TC9 (incorrect expense date input format)
		};
		return invalidData;
	}
	
	// This is a test for valid calculator data
	@Test(dataProvider="validExpenseData", timeOut=10000)
	public void validDataTests(String s1, String s2, String ans){
		basicBillTest.expenseInputTestTemplate(s1,s2, ans);
	}
	
	// This is a test for invalid calculator data 
	@Test(dataProvider="invalidExpenseData", timeOut=10000)
	public void invalidDataTests(String s1, String s2, String ans){
		basicBillTest.expenseInputTestTemplate(s1,s2, ans);
	}

}