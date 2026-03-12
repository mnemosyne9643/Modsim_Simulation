namespace Modsim_Simulation
{
    partial class MainView
    {
        /// <summary>
        ///  Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        ///  Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        ///  Required method for Designer support - do not modify
        ///  the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(MainView));
            webViewForms = new Microsoft.Web.WebView2.WinForms.WebView2();
            ((System.ComponentModel.ISupportInitialize)webViewForms).BeginInit();
            SuspendLayout();
            // 
            // webViewForms
            // 
            webViewForms.AllowExternalDrop = true;
            webViewForms.CreationProperties = null;
            webViewForms.DefaultBackgroundColor = Color.White;
            webViewForms.Dock = DockStyle.Fill;
            webViewForms.Location = new Point(0, 0);
            webViewForms.Margin = new Padding(3, 2, 3, 2);
            webViewForms.Name = "webViewForms";
            webViewForms.Size = new Size(921, 487);
            webViewForms.TabIndex = 0;
            webViewForms.ZoomFactor = 1D;
            webViewForms.WebMessageReceived += webViewForms_WebMessageReceived;
            // 
            // MainView
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(921, 487);
            Controls.Add(webViewForms);
            Icon = (Icon)resources.GetObject("$this.Icon");
            Margin = new Padding(3, 2, 3, 2);
            Name = "MainView";
            StartPosition = FormStartPosition.CenterScreen;
            Text = "Ragnarok Simulator";
            WindowState = FormWindowState.Maximized;
            ((System.ComponentModel.ISupportInitialize)webViewForms).EndInit();
            ResumeLayout(false);
        }

        #endregion

        private Microsoft.Web.WebView2.WinForms.WebView2 webViewForms;
    }
}
