
using Microsoft.Web.WebView2;
using System.Text.Json;
namespace Modsim_Simulation
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
            string baseDir = AppDomain.CurrentDomain.BaseDirectory;
            string fullPath = Path.Combine(baseDir, "FrontEnd", "index.html");
            webViewForms.Source = new Uri(fullPath);
        }

    }
}
