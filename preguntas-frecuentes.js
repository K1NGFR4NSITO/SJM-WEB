document.addEventListener("DOMContentLoaded", () => {
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach((item) => {
        const btn = item.querySelector(".faq-question");
        const icon = item.querySelector(".faq-question i");

        if (!btn) return;

        btn.addEventListener("click", () => {
            const isOpen = item.classList.contains("open");

            faqItems.forEach((faq) => {
                faq.classList.remove("open");

                const faqIcon = faq.querySelector(".faq-question i");
                if (faqIcon) {
                    faqIcon.classList.remove("fa-minus");
                    faqIcon.classList.add("fa-plus");
                }
            });

            if (!isOpen) {
                item.classList.add("open");

                if (icon) {
                    icon.classList.remove("fa-plus");
                    icon.classList.add("fa-minus");
                }
            }
        });
    });
});