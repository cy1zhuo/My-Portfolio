const scrollToTopButton = document.getElementById('scrollToTop');
const pdfModal = document.getElementById('pdfModal');
const pdfViewer = document.getElementById('pdfViewer');
const closeModal = pdfModal?.querySelector('.close');
const certificateBoxes = document.querySelectorAll('.certificate-box, .cert-card');
const navLinks = document.querySelectorAll('.main-nav a');
const mobileToggle = document.querySelector('.mobile-toggle');
const mainNav = document.querySelector('.main-nav');

function toggleMobileNav() {
    if (!mainNav) return;
    mainNav.classList.toggle('open');
}

if (mobileToggle) {
    mobileToggle.addEventListener('click', toggleMobileNav);
}

navLinks.forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();
        const targetId = link.getAttribute('href').slice(1);
        const target = document.getElementById(targetId);
        if (target) {
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
        if (mainNav) {
            mainNav.classList.remove('open');
        }
    });
});

if (scrollToTopButton) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopButton.style.display = 'flex';
        } else {
            scrollToTopButton.style.display = 'none';
        }
    });

    scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

if (certificateBoxes.length > 0 && pdfModal && pdfViewer) {
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const downloadLink = document.getElementById('downloadLink');
    const imageViewer = document.getElementById('imageViewer');

    const closeCertificateModal = () => {
        pdfModal.classList.remove('show');
        pdfModal.setAttribute('aria-hidden', 'true');
        pdfViewer.src = '';
        imageViewer.src = '';
        imageViewer.hidden = true;
        pdfViewer.hidden = false;
    };

    certificateBoxes.forEach(box => {
        box.addEventListener('click', () => {
            const filePath = box.dataset.file;
            const title = box.dataset.title || 'Certificate';
            const desc = box.dataset.desc || 'Preview the certificate.';
            const isImage = filePath?.match(/\.(png|jpg|jpeg|webp)$/i);

            if (modalTitle) modalTitle.textContent = title;
            if (modalDescription) modalDescription.textContent = desc;
            if (downloadLink) {
                downloadLink.href = encodeURI(filePath || '');
                downloadLink.textContent = 'Download file';
            }

            if (filePath) {
                if (isImage) {
                    imageViewer.src = encodeURI(filePath);
                    imageViewer.hidden = false;
                    pdfViewer.hidden = true;
                } else {
                    pdfViewer.src = encodeURI(filePath);
                    pdfViewer.hidden = false;
                    imageViewer.hidden = true;
                }
                pdfModal.classList.add('show');
                pdfModal.setAttribute('aria-hidden', 'false');
            }
        });

        box.addEventListener('keydown', event => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                box.click();
            }
        });
    });

    if (closeModal) {
        closeModal.addEventListener('click', closeCertificateModal);
    }

    window.addEventListener('click', event => {
        if (event.target === pdfModal) {
            closeCertificateModal();
        }
    });
} else if (certificateBoxes.length > 0) {
    console.warn('Certificate modal elements are missing or incomplete.');
}

const revealSections = document.querySelectorAll('.section');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

revealSections.forEach(section => revealObserver.observe(section));

const style = document.createElement('style');
style.textContent = `
.section { opacity: 0; transform: translateY(40px); transition: opacity 0.8s ease, transform 0.8s ease; }
.section.revealed { opacity: 1; transform: translateY(0); }
`;
document.head.appendChild(style);
