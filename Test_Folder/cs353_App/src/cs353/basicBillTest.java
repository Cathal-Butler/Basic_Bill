//
// Fuel Checker web test
// - navigation tests
//
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
	// TODO
	static String url="https://o62mq.csb.app/option2"; //Inserted CodeSandbox Project URL
	
	
	@BeforeClass
	public void setupDriver() throws Exception {
		System.out.println("Expense Input started at: " + LocalDateTime.now());
		System.out.println("CS353 Basic Bill Application URL: " + url);
		System.out.println();
		// Create firefox driver
		// System.setProperty("webdriver.gecko.driver","./selenium/geckodriver.exe");
		// driver = new FirefoxDriver();
		// Create chrome driver
		// TODO
		//C:\Users\catha\Downloads\chromedriver_win32\chromedriver.exe
		System.setProperty("webdriver.chrome.driver","C:\\\\\\\\Users\\\\\\\\catha\\\\\\\\Downloads\\\\\\\\\\\\\\\\chromedriver_win32\\\\\\\\chromedriver.exe"); //Referred to Chrome Driver Path
		driver = new ChromeDriver();
		// Create wait
		wait = new WebDriverWait( driver, 50 ); //Changed to 50 seconds to allow time to login
		// Open web page
		driver.get( url );
	}

	@AfterClass
	public void shutdown() {
		driver.close();
		driver.quit(); // close the drivers
		System.out.println("CS353 Basic Bill App Test finished at: " + LocalDateTime.now());
	}
	
	@BeforeMethod
	public void setUp() throws Exception {
		driver.get(url);
	    // wait until displayed; page is fully loaded when submit button appears
		// TODO: Find the ID of the submit button
	    wait.until(ExpectedConditions.presenceOfElementLocated(By.id("submitExpense"))); //Inserted ID of Submit Expense Button
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

	public static void calculatorTestTemplate(String s1,String s2){
		System.out.println("START: The page title is now " + driver.getTitle()); 
		
		// TODO: Inspect the HTML source of the website
    	// and identify the IDs of the relevant parts of the form
		// to automatically enter the parameter data into the form
		// code will look similar to this: 
	    // driver.findElement(By.id("TEXT BOX ID ")).sendKeys();
		driver.findElement(By.id("expenseAmount")).sendKeys(s1); //Inserted element ID for expense input box
		driver.findElement(By.id("expenseDate")).sendKeys(s2);  //Inserted element ID for date input
//***REMOVED FOR THIS TEST		driver.findElement(By.id("term2")).sendKeys(s3);  //Inserted element ID for term2
	       
        // TODO: as above, find the ID of the submit button in the source code
        // so that you can hit the submit button automatically
        driver.findElement(By.id("submitExpense")).submit();  //Inserted id of Submit Expense Button
        System.out.println("PROCESS: The page title is now " + driver.getTitle());
   
        // TODO: The answer (if you view the source of the processed page)
        // is in a DIV called 'answer' - this is the id. 
        // extract the text from that DIV.
//****REMOVED NO ANSWER        String answerGenerated = driver.findElement(By.id("answer1")).getText(); //Inserted element ID of answer
//        System.out.println("The answer generated by the web application is [" + answerGenerated + "]");
    
        // This is where we put the expected output of our test
        // based on our input above. 
//**** REMOVED NO ANSWER        String expectedAnswer = expectedAns;
    
        // Write some stuff to the console. //****CHANGED 
        System.out.println("Here is the result of our CS353 Basic Bill Testing");

        // Wait for four seconds so you can physically see the output
        try {
        	Thread.sleep(400);
        	System.out.println("CS353 Basic Bill Test: Finished sleeping");
        } catch (InterruptedException e) {
        	e.printStackTrace();
	    }
        
	    // Compare the expected answer with real answer
		// Report a failure if this is the case
//***REMOVED NO ANSWER	    AssertJUnit.assertEquals(expectedAnswer,answerGenerated);
	}

	// Create a DATA PROVIDER for valid data. 
	// Note that the structure of the multidimensional array has the same order 
	// as the input parameters for both the data provider methods and the template 
	// method.		
	@DataProvider(name="validCalculatorData")
	public static Object[][] createValidCalculatorData() {
		// Test Input data is added here 
		Object[][] validData = {
				// ... term 1, Date is all that is to be entered
				{"10", "2021-04-01"}, //Valid T1
				{"110", "2021-04-08"},
				{"55", "2021-04-07"},
			
				
		};
		return validData;
	}
	
	// Create a DATA PROVIDER for invalid Data.
	// Note that the structure of the multidimensional array has the same order 
	// as the input parameters for both the data provider methods and the template method.  
	@DataProvider(name="invalidCalculatorData")
	public static Object[][] createInValidCalculatorData() {
		// Test Input data is added here 
		Object[][] invalidData = {
				// ...	term 1, operand, term2, expected answer
				{"-6", "2021-08-02"}, //Invalid T1
				{"-12", "2021-10-02"},
				
				
				
		};
		return invalidData;
	}
	
	// This is a test for valid calculator data
	@Test(dataProvider="validCalculatorData", timeOut=10000)
	public void validDataTests(String s1, String s2){
		basicBillTest.calculatorTestTemplate(s1,s2);
	}
	
	// This is a test for invalid calculator data 
	@Test(dataProvider="invalidCalculatorData", timeOut=10000)
	public void invalidDataTests(String s1, String s2){
		basicBillTest.calculatorTestTemplate(s1,s2);
	}

}