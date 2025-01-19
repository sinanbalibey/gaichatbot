# Project

# Chatbot Gemini App

## Proje Hakkında

Bu proje, Fırat Üniversitesi'ndeki araştırmacıların bilgilerinden yararlanarak sorulara yanıt verebilen bir yapay zeka modelini sunar. Kullanıcıların araştırmacılar hakkında sorular sorabileceği bir arayüz sağlanmıştır. Proje, Google Gemini modeli ile fine-tuning işlemi gerçekleştirilmiş bir chatbot içerir ve Netlify ile canlıya alınmıştır. Ek olarak, proje bir Docker container olarak çalıştırılabilir.

## Özellikler

- **Araştırmacı Veritabanı:**
    - DergiPark üzerinden Fırat Üniversitesi araştırmacılarının bilgileri çekilmiştir.
    - Araştırmacıların unvanları, çalışma alanları ve yayın bilgileri düzenlenerek bir soru-cevap formatına dönüştürülmüştür.
- **Yapay Zeka Tabanlı Cevaplama:**
    - Fine-tuning edilmiş Google Gemini modeli, kullanıcı sorularına yanıt verir.
- **Web Arayüzü:**
    - Kullanıcılar, sorularını kolayca arayüz üzerinden sorabilir.
- **Docker Desteği:**
    - Proje, Docker container olarak çalıştırılabilir.

## Kullanılan Teknolojiler

- **Python:** Veri çekme ve düzenleme işlemleri.
- **BeautifulSoup:** DergiPark'tan veri çekmek için kullanıldı.
- **Pandas:** Çekilen verilerin düzenlenmesi ve işlenmesi.
- **Google Gemini:** Chatbot modeli.
- **Bolt.new:** Arayüz geliştirme.
- **Netlify:** Web arayüzünün canlıya alınması.
- **Docker:** Projenin containerize edilmesi.

## Docker Kullanımı

```bash
docker run -p 8080:80 sibacode/chatbot-gemini-app
```

Tarayıcınızda http://localhost:8080 adresine giderek chatbot arayüzüne ulaşabilirsiniz.

## Canlı Demo

Projeyi canlı olarak deneyimlemek için aşağıdaki bağlantıyı kullanabilirsiniz:

[Canlı Demo - Netlify](https://coruscating-genie-78d87c.netlify.app/)

Çekilen Veriler

![goruntu8.PNG](https://github.com/sinanbalibey/gaichatbot/blob/main/img/goruntu8.PNG)

Eğitim Performansı

![goruntu1.PNG](https://github.com/sinanbalibey/gaichatbot/blob/main/img/goruntu1.PNG)

Model kıyaslama gemini2.0 vs Fine-Tunning

![goruntu2.PNG](https://github.com/sinanbalibey/gaichatbot/blob/main/img/goruntu2.PNG)

Model kıyaslama gemini2.0 vs Fine-Tunning

![goruntu3.PNG](https://github.com/sinanbalibey/gaichatbot/blob/main/img/goruntu3.PNG)

Model kıyaslama gemini2.0 vs Fine-Tunning

![goruntu4.PNG](https://github.com/sinanbalibey/gaichatbot/blob/main/img/goruntu4.PNG)

Model kıyaslama gemini2.0 vs Fine-Tunning

![goruntu5.PNG](https://github.com/sinanbalibey/gaichatbot/blob/main/img/goruntu5.PNG)

![goruntu6.PNG](https://github.com/sinanbalibey/gaichatbot/blob/main/img/goruntu6.PNG)

![goruntu7.PNG](https://github.com/sinanbalibey/gaichatbot/blob/main/img/goruntu7.PNG)
