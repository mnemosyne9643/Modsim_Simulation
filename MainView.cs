
using Microsoft.Web.WebView2;
using Microsoft.Web.WebView2.Core;
using System.Text.Json;

namespace Modsim_Simulation
{
    public partial class MainView : Form
    {
        public MainView()
        {
            InitializeComponent();
            //string baseDir = AppDomain.CurrentDomain.BaseDirectory;
            //string fullPath = Path.Combine(baseDir, "FrontEnd", "index.html");
            //webViewForms.Source = new Uri(fullPath);

            InitializeWebView();

        }

        async void InitializeWebView()
        {
            await webViewForms.EnsureCoreWebView2Async(null);

            string rootFolder = Path.Combine(Application.StartupPath, "FrontEnd");

            webViewForms.CoreWebView2.AddHostObjectToScript("bridge", new StatCalculatorBridge());

            webViewForms.CoreWebView2.SetVirtualHostNameToFolderMapping(
                "app.local",
                rootFolder,
                CoreWebView2HostResourceAccessKind.Allow
                );

            webViewForms.CoreWebView2.Navigate("https://app.local/index.html");
        }
    }
}
