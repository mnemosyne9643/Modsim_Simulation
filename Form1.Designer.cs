namespace Modsim_Simulation
{
    partial class Form1
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
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(Form1));
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
            webViewForms.Name = "webViewForms";
            webViewForms.Size = new Size(1053, 649);
            webViewForms.TabIndex = 0;
            webViewForms.ZoomFactor = 1D;
            // 
            // Form1
            // 
            AutoScaleDimensions = new SizeF(8F, 20F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(1053, 649);
            Controls.Add(webViewForms);
            Icon = (Icon)resources.GetObject("$this.Icon");
            Name = "Form1";
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
