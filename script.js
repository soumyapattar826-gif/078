$(document).ready(function () {
    $(".btn, .download-btn").hover(
        function () { $(this).css("transform", "scale(1.06)"); },
        function () { $(this).css("transform", "scale(1)"); }
    );

    // Download a section as an HTML file with inline CSS
    async function downloadSection(filename, selector) {
        const el = document.querySelector(selector);
        if (!el) return alert('Content not found');
        let styles = '';
        try {
            const res = await fetch('style.css');
            if (res.ok) styles = await res.text();
        } catch (e) { styles = ''; }

        const html = `<!doctype html><html><head><meta charset="utf-8"><title>${filename}</title><style>${styles}</style></head><body>${el.outerHTML}</body></html>`;
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove();
        URL.revokeObjectURL(url);
    }

    // Print a section (user can select Save as PDF in print dialog)
    async function printSection(selector) {
        const el = document.querySelector(selector);
        if (!el) return alert('Content not found');
        let styles = '';
        try {
            const res = await fetch('style.css');
            if (res.ok) styles = await res.text();
        } catch (e) { styles = ''; }

        const printWindow = window.open('', '_blank');
        printWindow.document.write('<!doctype html><html><head><meta charset="utf-8"><title>Print</title><style>' + styles + '</style></head><body>' + el.outerHTML + '</body></html>');
        printWindow.document.close();
        // give some time to render
        setTimeout(() => { printWindow.focus(); printWindow.print(); printWindow.close(); }, 600);
    }

    // Button listeners for resume and biodata pages
    const downloadResumeBtn = document.getElementById('download-resume');
    const printResumeBtn = document.getElementById('print-resume');
    if (downloadResumeBtn) downloadResumeBtn.addEventListener('click', () => downloadSection('Soumya_Pattar_Resume.html', '#resume-content'));
    if (printResumeBtn) printResumeBtn.addEventListener('click', () => printSection('#resume-content'));

    const downloadBiodataBtn = document.getElementById('download-biodata');
    const printBiodataBtn = document.getElementById('print-biodata');
    if (downloadBiodataBtn) downloadBiodataBtn.addEventListener('click', () => downloadSection('Soumya_Pattar_Biodata.html', '#biodata-content'));
    if (printBiodataBtn) printBiodataBtn.addEventListener('click', () => printSection('#biodata-content'));
});
