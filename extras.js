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
    <div class="ti-runner ti-pack" aria-hidden="true">
        <span class="ti-wolf-emoji">🐺</span>
        <span class="ti-wolf-emoji">🐺</span>
        <span class="ti-wolf-emoji">🐺</span>
        <span class="ti-wolf-emoji">🐺</span>
    </div>
    <p class="ti-red">☪ ✦ ★</p>
    <p id="tiMessage">Atalarımızın izinde...</p>`;
        body.appendChild(overlay);
        // Tek kurt siluetinden dort kurtlu bir suru olustur.
        const packLeaderWolf = overlay.querySelector(".ti-runner");
        const wolfModel = packLeaderWolf &&
            packLeaderWolf.querySelector("svg");

        if (packLeaderWolf && wolfModel &&
            !packLeaderWolf.classList.contains("ti-pack")) {
            packLeaderWolf.classList.add("ti-pack");

            for (let i = 0; i < 3; i++) {
                const follower = wolfModel.cloneNode(true);
                follower.classList.add("ti-pack-member");
                packLeaderWolf.appendChild(follower);
            }
        }


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


/* SITE_RATING_WIDGET_LOCAL */
(function () {
    function initRating() {
        if (document.getElementById("siteRatingSection")) return;

        const section = document.createElement("section");
        section.id = "siteRatingSection";
        section.className = "site-rating-section";
        section.innerHTML = `
          <p class="site-rating-kicker">⭐ FİKRİNİ BİZİMLE PAYLAŞ</p>
          <h2>Atalarımızın İzinde'yi nasıl buldun?</h2>
          <p>Sitemize 10 üzerinden bir puan ver!</p>
          <div class="site-rating-buttons">
            ${Array.from({length:10}, (_,i) =>
              `<button type="button" class="site-rating-button"
              data-score="${i+1}">${i+1}</button>`
            ).join("")}
          </div>
          <p id="siteRatingResult" aria-live="polite">Puanını seç ❤️</p>
          <p class="site-rating-note">
            Bu basit sürüm puanını yalnızca bu tarayıcıda saklar.
          </p>`;

        const footer = document.querySelector("footer");
        if (footer) footer.parentNode.insertBefore(section, footer);
        else document.body.appendChild(section);

        const result = section.querySelector("#siteRatingResult");
        const buttons = section.querySelectorAll(".site-rating-button");

        function selectScore(score, saved) {
          buttons.forEach(b => {
            const active = Number(b.dataset.score) === score;
            b.classList.toggle("selected", active);
            b.setAttribute("aria-pressed", String(active));
          });
          result.textContent = saved
            ? "Puanın kaydedildi: " + score + "/10 ❤️"
            : "Puanını seç ❤️";
        }

        buttons.forEach(b => b.addEventListener("click", () => {
          const score = Number(b.dataset.score);
          try {
            localStorage.setItem("atalarimizinIzindeSitePuani", score);
            selectScore(score, true);
          } catch (e) {
            result.textContent = "Seçtiğin puan: " + score + "/10";
          }
        }));

        try {
          const old = Number(localStorage.getItem("atalarimizinIzindeSitePuani"));
          if (old >= 1 && old <= 10) selectScore(old, true);
        } catch (e) {}
    }

    if (document.readyState === "loading")
        document.addEventListener("DOMContentLoaded", initRating);
    else initRating();
})();


/* FIREBASE_SHARED_SCOREBOARD_V1 */
(function () {
    const config = {
        apiKey: "AIzaSyCI4yFdFfB82JK2-22FhXu_-2P0zt37CY",
        authDomain: "turkun-izinde-puan-20261018.firebaseapp.com",
        projectId: "turkun-izinde-puan-20261018",
        storageBucket: "turkun-izinde-puan-20261018.firebasestorage.app",
        messagingSenderId: "769511864708",
        appId: "1:769511864708:web:03e9586ca04fe6b09785d1"
    };

    let pendingSave = Promise.resolve();
    let lastSaveError = null;

    const ready = (async function () {
        const version = "11.10.0";
        const [appSDK, authSDK, dbSDK] = await Promise.all([
            import(`https://www.gstatic.com/firebasejs/${version}/firebase-app.js`),
            import(`https://www.gstatic.com/firebasejs/${version}/firebase-auth.js`),
            import(`https://www.gstatic.com/firebasejs/${version}/firebase-firestore.js`)
        ]);

        const app = appSDK.initializeApp(config);
        const auth = authSDK.getAuth(app);
        await authSDK.signInAnonymously(auth);

        return {
            db: dbSDK.getFirestore(app),
            fs: dbSDK
        };
    })();

    window.kaydetPuan = function () {
        let score = NaN;
        let firstName = "";
        let lastName = "";

        try {
            score = Number(puan);
            firstName = String(oyuncuAdi || "").trim();
            lastName = String(oyuncuSoyadi || "").trim();
        } catch (e) {
            console.error("Test sonucu okunamadı.", e);
        }

        if (!Number.isInteger(score) || score < 0 || score > 10) {
            console.error("Geçersiz test puanı.");
            return Promise.resolve();
        }

        const first = Array.from(firstName)[0] || "";
        const last = Array.from(lastName)[0] || "";
        const initials = first && last
            ? first.toLocaleUpperCase("tr-TR") + ". " +
              last.toLocaleUpperCase("tr-TR") + "."
            : "Misafir";

        lastSaveError = null;

        pendingSave = ready.then(async function (services) {
            await services.fs.addDoc(
                services.fs.collection(services.db, "scores"),
                {
                    ad: initials,
                    puan: score,
                    createdAt: services.fs.serverTimestamp()
                }
            );
        }).catch(function (error) {
            lastSaveError = error;
            console.error("Puan ortak tabloya kaydedilemedi:", error);
        });

        return pendingSave;
    };

    window.tabloyuGoster = async function () {
        const table = document.getElementById("leaderboard");
        if (!table) return;

        table.textContent = "Ortak puan tablosu yükleniyor...";

        try {
            const services = await ready;
            await pendingSave;

            const q = services.fs.query(
                services.fs.collection(services.db, "scores"),
                services.fs.orderBy("puan", "desc"),
                services.fs.limit(50)
            );

            const results = await services.fs.getDocs(q);
            table.replaceChildren();

            if (lastSaveError) {
                const warning = document.createElement("p");
                warning.textContent =
                    "Son puan kaydedilemedi. İnternet bağlantısını kontrol et.";
                table.appendChild(warning);
            }

            if (results.empty) {
                const empty = document.createElement("p");
                empty.textContent = "Henüz ortak test sonucu yok.";
                table.appendChild(empty);
                return;
            }

            results.forEach(function (record, index) {
                const result = record.data();
                const row = document.createElement("div");
                row.className = "board-row";

                const name = document.createElement("span");
                name.textContent =
                    (index + 1) + ". " + String(result.ad || "Misafir");

                const score = document.createElement("strong");
                score.className = "red";
                score.textContent = Number(result.puan) + " / 10";

                row.append(name, score);
                table.appendChild(row);
            });
        } catch (error) {
            console.error("Ortak puan tablosu yüklenemedi:", error);
            table.textContent =
                "Ortak puan tablosu yüklenemedi. Bağlantı ve Firebase ayarlarını kontrol et.";
        }
    };

    ready.then(function () {
        window.tabloyuGoster();
    }).catch(function (error) {
        console.error("Firebase bağlantısı kurulamadı:", error);
        const table = document.getElementById("leaderboard");
        if (table) {
            table.textContent =
                "Puan tablosuna bağlanılamadı. Firebase ayarlarını kontrol et.";
        }
    });
})();
