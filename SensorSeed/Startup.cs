using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(SensorSeed.Startup))]
namespace SensorSeed
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
