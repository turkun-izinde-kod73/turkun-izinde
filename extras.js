(function () {
    function baslat() {
        const body = document.body;
        const test = document.getElementById("test");

        if (!test) {
            console.error("Test bölümü bulunamadı.");
            return;
        }

        const intro = document.createElement("div");
        intro.className = "ti-intro";
        intro.innerHTML = `
            <div>
                <div class="ti-wolf">🐺</div>
                <p class="ti-red">ATALARIMIZIN İZİNDE</p>
                <h1>Atalarımızın İzinde</h1>
<blockquote class="ti-quote">“Türk çocuğu ecdadını tanıdıkça, daha büyük işler yapmak için kendinde kuvvet bulacaktır.”</blockquote>
<p class="ti-quote-author">Gazi Mustafa Kemal Atatürk</p>
                <p>Tarihimizi keşfet, kültürümüzü tanı ve bilgi yolculuğuna başla.</p>
                <button class="ti-button" id="tiEnter">Yolculuğa Başla →</button>
                <p class="ti-intro-foot">Atalarımızın tarihini ve kültürünü tanımak, mirasımızı gelecek nesillere aktarmak için hazırlanmıştır.</p>
                <p class="ti-intro-foot"><strong>Created by Hira Cinali</strong> · İlk yazılım projem</p>
            </div>`;
        body.prepend(intro);

        const overlay = document.createElement("div");
        overlay.className = "ti-transition";
        overlay.innerHTML = `
            <div class="ti-runner" aria-hidden="true">
            <svg viewBox="0 0 240 130" focusable="false">
                <g class="ti-wolf-legs ti-back-legs">
                    <path d="M60 61 L77 66 L70 82 L52 98 L42 94 L56 77 Z"/>
                    <path d="M76 60 L89 66 L103 79 L95 87 L77 77 L65 69 Z"/>
                </g>
                <path class="ti-wolf-body" d="M31 51 L11 34 L7 22 L25 35 L43 42 C58 34 77 31 95 36 L119 41 C133 42 146 34 157 22 L173 12 L184 17 L178 29 L194 24 L211 26 L228 20 L222 32 L231 38 L217 48 L198 51 L185 47 L176 58 L164 66 C150 69 134 68 120 66 L96 64 C77 65 62 61 48 62 L34 62 Z"/>
                <g class="ti-wolf-legs ti-front-legs">
                    <path d="M144 61 L157 65 L170 82 L185 93 L180 100 L161 90 L147 76 L136 70 Z"/>
                    <path d="M151 60 L163 62 L162 75 L146 89 L136 86 L148 73 Z"/>
                </g>
            </svg>
        </div>
            <p class="ti-red">☪ ✦ ★</p>
            <p id="tiMessage">Tarih yolculuğu devam ediyor...</p>`;
        body.appendChild(overlay);

        const bilgiler = [
            ["Asya Hun Devleti",
             "Asya Hun Devleti, Türk tarihinin bilinen ilk teşkilatlı devleti olarak genellikle kabul edilir. Mete Han, onlu askerî teşkilatla ilişkilendirilen önemli bir hükümdardır."],
            ["Göktürkler",
             "Göktürk Kağanlığı, Türk adını devlet adı olarak kullanan ilk devlet olarak bilinir. İlk Göktürk Kağanlığı 6. yüzyılda ortaya çıkmıştır."],
            ["Orhun Yazıtları",
             "Orhun Yazıtları 8. yüzyıldan kalan önemli eski Türkçe kaynaklardır. Kül Tigin ve Bilge Kağan yazıtları, dönemin yönetimi ve toplumu hakkında bilgiler verir."],
            ["Selçuklular ve Malazgirt",
             "Büyük Selçuklu Devleti Türk-İslam tarihinde önemli bir yere sahiptir. Alp Arslan'ın 1071 Malazgirt Zaferi, Anadolu tarihinin önemli dönüm noktalarındandır."],
            ["Mustafa Kemal Atatürk",
             "Atatürk Selanik'te doğmuştur. 19 Mayıs 1919'da Samsun'a çıkışı, Millî Mücadele'nin önemli başlangıç noktalarından biridir."],
            ["TBMM ve İstiklal Marşı",
             "Türkiye Büyük Millet Meclisi 23 Nisan 1920'de açılmıştır. Mehmet Âkif Ersoy'un yazdığı İstiklal Marşı 12 Mart 1921'de kabul edilmiştir."],
            ["Sakarya ve Büyük Taarruz",
             "Sakarya Meydan Muharebesi 1921'de gerçekleşmiştir. Büyük Taarruz 26 Ağustos 1922'de başlamış, 30 Ağustos'ta Başkomutanlık Meydan Muharebesi kazanılmıştır."],
            ["Cumhuriyet ve kültürümüz",
             "Türkiye Cumhuriyeti 29 Ekim 1923'te ilan edilmiştir. Dilimiz, müziğimiz, el sanatlarımız ve geleneklerimiz Türk kültürel mirasının parçalarıdır."]
        ];

        const yolculuk = document.createElement("div");
        yolculuk.className = "ti-journey";
        yolculuk.id = "historyJourney";
        yolculuk.innerHTML = `
            <div id="tiCounter">BİLGİ 1 / 8</div>
            <div class="ti-progress"><div id="tiProgress"></div></div>
            <h3 id="tiTitle"></h3>
            <p id="tiText"></p>
            <button class="ti-button" id="tiNext">Sonraki Bilgi →</button>
            <p id="tiStatus">Bilgiyi okuduktan sonra ilerle.</p>`;

        test.parentNode.insertBefore(yolculuk, test);

        let sira = 0;
        let tamamlandi = false;
        let gecis = false;

        const sayac = document.getElementById("tiCounter");
        const baslik = document.getElementById("tiTitle");
        const yazi = document.getElementById("tiText");
        const ilerleme = document.getElementById("tiProgress");
        const sonraki = document.getElementById("tiNext");
        const durum = document.getElementById("tiStatus");

        function bilgiGoster() {
            sayac.textContent = "BİLGİ " + (sira + 1) + " / 8";
            baslik.textContent = bilgiler[sira][0];
            yazi.textContent = bilgiler[sira][1];
            ilerleme.style.width = ((sira + 1) / 8 * 100) + "%";
            sonraki.textContent = sira === 7
                ? "Bilgileri Tamamla ve Teste Geç →"
                : "Sonraki Bilgi →";
        }

        function kurtlaGec(target, mesaj) {
            const hedef = document.getElementById(target);
            if (!hedef || gecis) return;

            gecis = true;
            document.getElementById("tiMessage").textContent = mesaj;
            overlay.classList.add("active");

            const kurt = overlay.querySelector(".ti-runner");
            kurt.classList.remove("ti-running");
            void kurt.offsetWidth;
            kurt.classList.add("ti-running");

            setTimeout(() => {
                hedef.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 400);

            setTimeout(() => {
                overlay.classList.remove("active");
                kurt.classList.remove("ti-running");
                gecis = false;
            }, 1250);
        }

        document.getElementById("tiEnter").addEventListener("click", function () {
            intro.remove();
            body.classList.remove("ti-locked");
            kurtlaGec("ana", "Atalarımızın İzinde yolculuğu başlıyor...");
        });

        sonraki.addEventListener("click", function () {
            if (tamamlandi) return;

            if (sira < 7) {
                sira++;
                bilgiGoster();
                return;
            }

            tamamlandi = true;
            sayac.textContent = "YOLCULUK TAMAMLANDI";
            baslik.textContent = "Tarih yolculuğunu tamamladın! 🇹🇷";
            yazi.textContent = "Sekiz bilgi ekranını tamamladın. Şimdi 10 soruluk testine geçebilirsin.";
            ilerleme.style.width = "100%";
            sonraki.textContent = "Tamamlandı ✓";
            sonraki.disabled = true;
            durum.textContent = "Testin kilidi açıldı.";
            kurtlaGec("test", "Şimdi bilgini sınama zamanı!");
        });

        document.addEventListener("click", function (event) {
            const el = event.target instanceof Element ? event.target : null;
            if (!el) return;

            const link = el.closest('a[href^="#"]');
            if (link) {
                const hedef = link.getAttribute("href").slice(1);
                if (!document.getElementById(hedef)) return;

                event.preventDefault();

                if (hedef === "test" && !tamamlandi) {
                    durum.textContent = "Önce sekiz bilgi ekranını tamamlamalısın.";
                    kurtlaGec("historyJourney", "Önce tarih yolculuğunu tamamla!");
                    return;
                }

                const mesajlar = {
                    ana: "Atalarımızın İzinde...",
                    tarih: "Tarihimizin izinde...",
                    test: "Bilgini sınama zamanı...",
                    puanlar: "Puan tablosuna yolculuk..."
                };
                kurtlaGec(hedef, mesajlar[hedef] || "Yolculuk devam ediyor...");
                return;
            }

            if (!tamamlandi) {
                const dugme = el.closest("#quiz button");
                if (dugme && /başla/i.test(dugme.textContent)) {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                    durum.textContent = "Teste başlamadan önce sekiz bilgi ekranını tamamla.";
                    kurtlaGec("historyJourney", "Önce bilgileri keşfet!");
                }
            }
        }, true);

        body.classList.add("ti-locked");
        bilgiGoster();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", baslat);
    } else {
        baslat();
    }
})();
