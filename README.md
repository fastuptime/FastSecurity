# FastSecurity 🚀

FastSecurity, Discord sunucularınız için üye yedekleme ve sunucu koruma yazılımıdır. Bu yazılım sayesinde sunucunuzun güvenliğini sağlayabilir ve üyelerinizi yedekleyebilirsiniz.

## Özellikler ✨

- Üye yedekleme 📦
- Sunucu koruma 🛡️
- reCAPTCHA koruması 🔒

## Gereksinimler 🛠️

- Node.js
- MongoDB Atlas hesabı
- Discord Geliştirici hesabı
- Google reCAPTCHA hesabı

## Kurulum 📥

### 1. Depoyu Klonlayın

```bash
git clone https://github.com/fastuptime/FastSecurity.git
cd FastSecurity
```

### 2. Gerekli Modülleri Yükleyin

```bash
npm install
```

### 3. Konfigürasyon Dosyasını Düzenleyin

`config.js` dosyasını açarak gerekli bilgileri girin:

```javascript
module.exports = {
  adminID: ["adminID", "Admin 2"], // admin id
  mongoURL: "mongoURL", // https://www.mongodb.com/cloud/atlas
  siteURL: "https://domain.com", // https://domain.com
  port: 80, // 80
  reCaptcha: {
    // https://www.google.com/recaptcha/admin/create
    siteKey: "xxxxxxxxxxxxxxxxxxxxxxxx", // site key
    secretKey: "xxxxxx-xxxx-xxxx-xxx", // secret key
  },
  bot: {
    // https://discord.com/developers/applications
    token: "token",
    clientSecret: "clientSecret",
    clientID: "clientID",
    // redictURL: "https://domain.com/callback",
  },
};
```

### 4. Uygulamayı Başlatın

```bash
node .
```

## Kullanım 📝

- **Admin Paneli**: Sunucu yönetimi ve yedekleme işlemleri için admin panelini kullanabilirsiniz.
- **reCAPTCHA**: Kayıt ve giriş işlemlerinde reCAPTCHA doğrulaması yapılır.
- **Discord Botu**: Discord botunuz ile sunucu aktivitelerini takip edin ve yönetin.

## Yardım ve Destek 📞

Herhangi bir sorun veya soru için lütfen bizimle iletişime geçin:

- [GitHub Issues](https://github.com/fastuptime/FastSecurity/issues)
- [Destek E-posta](mailto:fastuptime@gmail.com)

## Katkıda Bulunma 🤝

Katkıda bulunmak isterseniz lütfen bir pull request gönderin veya bir issue açın. Her türlü katkıya açığız!

## Lisans 📄

Bu proje MIT Lisansı altında lisanslanmıştır. Daha fazla bilgi için `LICENSE` dosyasına bakın.

---

**Not:** Daha fazla bilgi için [tanıtım videosunu](https://www.youtube.com/watch?v=ercuDW7JZws) izleyebilirsiniz.
