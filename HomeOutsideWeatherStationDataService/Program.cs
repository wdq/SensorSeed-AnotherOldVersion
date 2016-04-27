using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using Quartz;
using Quartz.Impl;
using Quartz.Job;
using System.Net;
using System.IO;
using System.Collections.Specialized;
using System.Net.Cache;

namespace HomeOutsideWeatherStationDataService
{
    class Program
    {
        static void Main(string[] args)
        {
            // DateTime lastRun = DateTime.Now.AddMinutes(-6);
            while (true)
            {
                DateTime currentTime = DateTime.Now;


                string html = string.Empty;
                string url = @"http://10.0.13.219/";
                var postData = new NameValueCollection();

                bool tryAgain = true;
                while(tryAgain) {
                    Console.Write(currentTime.ToString());
                    Console.Write(":    Getting sensor data...");
                    try
                    {
                        HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
                        request.CachePolicy = new HttpRequestCachePolicy(HttpRequestCacheLevel.NoCacheNoStore);
                        request.Timeout = 20000;

                        using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())

                        using (Stream stream = response.GetResponseStream())
                        using (StreamReader reader = new StreamReader(stream))
                        {
                            html = reader.ReadToEnd();
                            int index = html.IndexOf("\n");
                            html = html.Substring(index + "\n".Length);
                            string[] lines = html.Split(new string[] { "\n" }, StringSplitOptions.None);
                            for (int i = 0; i < 11; i++)
                            {
                                string lineData = lines[i].Substring(lines[i].IndexOf(":") + 2).Trim();
                                if (i == 0)
                                {
                                    postData["Temperature"] = lineData;
                                }
                                else if (i == 1)
                                {
                                    postData["Humidity"] = lineData;
                                }
                                else if (i == 2)
                                {
                                    postData["Pressure"] = lineData;
                                }
                                else if (i == 3)
                                {
                                    postData["Altitude"] = lineData;
                                }
                                else if (i == 4)
                                {
                                    postData["Wind"] = lineData;
                                }
                                else if (i == 5)
                                {
                                    postData["Gust"] = lineData;
                                }
                                else if (i == 6)
                                {
                                    postData["Rain"] = lineData;
                                }
                                else if (i == 7)
                                {
                                    postData["Battery"] = lineData;
                                }
                                else if (i == 8)
                                {
                                    postData["Solar"] = lineData;
                                }
                                else if (i == 9)
                                {
                                    postData["Direction"] = lineData;
                                }
                                else if (i == 10)
                                {
                                    postData["Temperature180"] = lineData;
                                }
                            }
                            using (var client = new WebClient())
                            {

                                var postResponse = client.UploadValues("http://iis.quade.co/SensorSeed/Sensor/AddHomeOutsideWeatherStationData", postData);

                                var postResponseString = Encoding.Default.GetString(postResponse);
                                Console.WriteLine(postResponseString);
                                tryAgain = false;
                            }

                        }
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine("Error");

                    }
            }

                Thread.Sleep(TimeSpan.FromMinutes(5));
            }
            /*
            try
            {
                Common.Logging.LogManager.Adapter = new Common.Logging.Simple.ConsoleOutLoggerFactoryAdapter { Level = Common.Logging.LogLevel.Info };

                // Grab the Scheduler instance from the Factory 
                IScheduler scheduler = StdSchedulerFactory.GetDefaultScheduler();

                // and start it off
                scheduler.Start();

                // define the job and tie it to our HelloJob class
                IJobDetail job = JobBuilder.Create<HelloJob>()
                    .WithIdentity("job1", "group1")
                    .Build();

                // Trigger the job to run now, and then repeat every 10 seconds
                ITrigger trigger = TriggerBuilder.Create()
                    .WithIdentity("trigger1", "group1")
                    .StartNow()
                    .WithSimpleSchedule(x => x
                        .WithIntervalInSeconds(300) // Every five minutes
                        .RepeatForever()) 
                    .Build(); 

                // Tell quartz to schedule the job using our trigger
                scheduler.ScheduleJob(job, trigger);

                // some sleep to show what's happening
                //Thread.Sleep(TimeSpan.FromSeconds(60));

                // and last shut down the scheduler when you are ready to close your program
                //scheduler.Shutdown();
            }
            catch (SchedulerException se)
            {
                //Console.WriteLine(se);
            }
            */
            Console.WriteLine("Press any key to close the application");
            Console.ReadKey();
        }
    }
    /*
    public class HelloJob : IJob
    {
        public void Execute(IJobExecutionContext context) 
        {
            Console.WriteLine("Getting sensor data...");

            string html = string.Empty;
            string url = @"http://10.0.13.219/";
            var postData = new NameValueCollection();

            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);

            using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
            using (Stream stream = response.GetResponseStream())
            using (StreamReader reader = new StreamReader(stream))
            {
                html = reader.ReadToEnd();
                int index = html.IndexOf("\n");
                html = html.Substring(index + "\n".Length);
                string[] lines = html.Split(new string[] { "\n" }, StringSplitOptions.None);
                for(int i = 0; i < 10; i++)
                { 
                    string lineData = lines[i].Substring(lines[i].IndexOf(":") + 2).Trim();
                    if(i == 0)
                    {
                        postData["Temperature"] = lineData;
                    }
                    else if(i == 1)
                    {
                        postData["Humidity"] = lineData;
                    }
                    else if (i == 2)
                    {
                        postData["Pressure"] = lineData;
                    }
                    else if (i == 3)
                    {
                        postData["Altitude"] = lineData;
                    }
                    else if (i == 4)
                    {
                        postData["Wind"] = lineData;
                    }
                    else if (i == 5)
                    {
                        postData["Gust"] = lineData;
                    }
                    else if (i == 6)
                    {
                        postData["Rain"] = lineData;
                    }
                    else if (i == 7)
                    {
                        postData["Battery"] = lineData;
                    }
                    else if (i == 8)
                    {
                        postData["Solar"] = lineData;
                    }
                    else if (i == 9)
                    {
                        postData["Direction"] = lineData;
                    }
                }
                using (var client = new WebClient())
                {

                    var postResponse = client.UploadValues("http://localhost/SensorSeed/Sensor/AddHomeOutsideWeatherStationData", postData);

                    var postResponseString = Encoding.Default.GetString(postResponse);
                    Console.WriteLine(postResponseString);
                }

            } 
        }
} */
}
