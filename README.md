<p align="center">
  <img src="logo.png" alt="Arvoxify" width="150" height="150" style="border-radius: 24px;" />
</p>

<h1 align="center">Arvoxify</h1>

<p align="center">
  <strong>YouTube Music Masaüstü Deneyimini Yerel ve Özgürce Yaşayın.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-3.11.0-blue?style=flat-square" alt="Version" />
  <img src="https://img.shields.io/badge/platform-Windows-0078D4?style=flat-square&logo=windows" alt="Platform" />
  <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="License" />
  <img src="https://img.shields.io/badge/electron-based-47848F?style=flat-square&logo=electron" alt="Electron" />
</p>

<p align="center">
  <a href="#-özellikler">Özellikler</a> •
  <a href="#-kurulum">Kurulum</a> •
  <a href="#%EF%B8%8F-yapılandırma">Yapılandırma</a> •
  <a href="#-katkıda-bulunma">Katkıda Bulunma</a>
</p>

---

##  Nedir?

**Arvoxify**, YouTube Music'i tam teşekküllü bir masaüstü uygulamasına dönüştüren, reklamsız, açık kaynaklı ve özelleştirilebilir bir müzik çalardır. Tarayıcı açmadan, reklam görmeden, tamamen açık kaynak kodlu yapısıyla arka planda müzik dinleyebilirsiniz.

> **chiatr** tarafından, **vox studios** için geliştirilmiştir.

---

##  Özellikler

###  Müzik Deneyimi
- YouTube Music'in tüm kütüphanesine erişim
- Arka planda kesintisiz müzik çalma
- Sistem tray'den hızlı kontrol (oynat/duraklat/geç)
- Klavye kısayolları ile medya tuşu desteği
- Discord Rich Presence entegrasyonu

###  Reklam Engelleme
- **3 katmanlı reklam engelleme sistemi:**
  -  **Filtre Listeleri** — EasyList + uBlock Origin kuralları ile network seviyesinde engelleme
  -  **Player İçi** — Video reklamlarını otomatik atlama
  -  **Reklam Hızlandırma** — Atlanamayan reklamları hızlandırarak geçme
- Ghostery motoru üzerine inşa edilmiş güçlü altyapı

###  Özelleştirme
- Uygulama içi menü çubuğu (in-app menu bar)
- Özel pencere başlığı desteği
- Tam ekran oynatıcı modu
- Görsel ince ayarlar (visual tweaks)
- 40+ dil desteği

###  Eklenti Sistemi
- Hassas ses kontrolü (Precise Volume)
- Görselleştirici (Visualizer)
- Picture-in-Picture modu
- Last.fm / ListenBrainz scrobbling
- SponsorBlock entegrasyonu
- Kalite seçici (Quality Changer)
- Altyazı desteği (Captions)
- Ve daha fazlası...

###  Gizlilik & Güvenlik
- Reklam izleme engelleme
- Gizlilik filtre listeleri (EasyPrivacy)
- Proxy desteği
- Otomatik güncelleme **yok** — tamamen bağımsız ve güvenli

---

##  Kurulum (Kaynak Koddan Çalıştırma)

Projeyi yerel bilgisayarınızda derlemek ve çalıştırmak için aşağıdaki adımları takip edebilirsiniz:

```bash
# Depoyu klonlayın
git clone https://github.com/chiatr/arvoxify.git

# Proje dizinine girin
cd arvoxify

# Bağımlılıkları yükleyin
pnpm install

# Geliştirme modunda yerel olarak çalıştırın
pnpm run dev

# Kendi kurulum (setup) paketlerinizi veya yürütülebilir dosyalarınızı derlemek için:
pnpm run build
```

**Gereksinimler:**
- Node.js ≥ 22
- pnpm ≥ 10

---

##  Yapılandırma

Arvoxify, üst menü çubuğundan veya uygulama içi menüden (`` ` `` tuşu) yapılandırılabilir:

| Ayar | Açıklama |
|------|----------|
| **Reklam Engelleme** | 3 moddan birini veya hepsini seçin |
| **Dil** | 40+ dil arasından seçim yapın |
| **Başlangıçta Aç** | Bilgisayar açılışında otomatik başlatma |
| **Sistem Tray** | Kapatma davranışını ayarlayın |
| **Proxy** | HTTP/SOCKS proxy desteği |
| **Discord RPC** | Discord durumunda çalan şarkıyı gösterin |

---

##  Katkıda Bulunma

Bu projede yardımı dokunan emchorian'a teşekkürler!

---

##  Lisans

Bu proje [MIT Lisansı](license) altında dağıtılmaktadır.

---

##  İletişim

- **Geliştirici discord:** ruksinbabatr
- **Stüdyo:** vox studios

---

<p align="center">
  <sub> Beğendiyseniz yıldız vermeyi unutmayın!</sub>
</p>
