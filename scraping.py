import requests
from bs4 import BeautifulSoup
import csv

# Ana sayfa URL'si
main_url = "https://dergipark.org.tr"

# Sayfa URL formatı
base_url = "https://dergipark.org.tr/tr/search"
query_suffix = "?aggs%5BinstitutionObj.topIz%5D%5B121%5D=RN99YA33JS&section=user&q="

# Verilerin kaydedileceği liste
data = []

# Sayfa numaralarını dolaş
for page in range(1, 87):  # 1'den 86'ya kadar
    if page == 1:
        url = f"{base_url}{query_suffix}"  # 1. sayfa için URL
    else:
        url = f"{base_url}/{page}{query_suffix}"  # Diğer sayfalar için URL

    print(f"Şu an işlenen sayfa: {url}")

    # HTTP isteği gönder
    response = requests.get(url)
    if response.status_code == 200:
        # Sayfa içeriğini işleme
        soup = BeautifulSoup(response.content, "html.parser")

        # Belirtilen class'taki profilleri bul
        profiles = soup.find_all("div", class_="col-xl-6")

        for idx, profile in enumerate(profiles, 1):
            # İsim
            name_element = profile.find("a", class_="user-info-title")
            name = name_element.text.strip() if name_element else "Bilinmiyor"

            # Unvan (Rank)
            rank = profile.find("span", class_="user-info-desc").text.strip() if profile.find("span", class_="user-info-desc") else "Bilinmiyor"

            # Çalışma konusu
            work_field_element = profile.find("div", class_="user-card-bottom")
            if work_field_element:
                work_field = " ".join(work_field_element.text.split())  # Tüm gereksiz boşlukları kaldır
            else:
                work_field = "Bilinmiyor"

            # Web sitesi (href)
            website_element = name_element.get('href') if name_element else None
            website = f"{main_url}{website_element}" if website_element else "Bilinmiyor"

            # Kullanıcının yayınlarını çek
            unique_publications = []
            if website != "Bilinmiyor":
                try:
                    user_response = requests.get(website)
                    if user_response.status_code == 200:
                        user_soup = BeautifulSoup(user_response.content, "html.parser")
                        publications = user_soup.find_all("div", class_="kt-widget-17__title")

                        # Yayın başlıklarını benzersiz hale getir
                        unique_publications = list(set([pub.text.strip() for pub in publications]))

                    else:
                        unique_publications = ["Profil sayfası yüklenemedi."]
                except Exception as e:
                    unique_publications = [f"Profil sayfasına erişimde hata oluştu: {e}"]
            else:
                unique_publications = ["Web sitesi bulunamadı."]

            # Yayınları tek bir string olarak birleştir
            publications_str = "; ".join(unique_publications)

            # Bilgileri listeye ekle
            data.append([name, rank, work_field, website, len(unique_publications), publications_str])

            # Kullanıcı bilgilerini ekrana yazdır
            print(f"{idx}. İsim: {name}")
            print(f"   Unvan: {rank}")
            print(f"   Çalışma Konusu: {work_field}")
            print(f"   Web Sitesi: {website}")
            print(f"   Yayın Sayısı: {len(unique_publications)}")
            print(f"   Yayınlar: {publications_str}")
            print("-" * 50)

    else:
        print(f"HTTP isteği başarısız oldu. Durum kodu: {response.status_code} - {url}")

# Verileri CSV dosyasına yazma
output_file = "researchers_with_publications.csv"
with open(output_file, "w", newline="", encoding="utf-8") as file:
    writer = csv.writer(file)
    # Başlık satırı
    writer.writerow(["Name", "Rank", "Work Field", "Website", "Publication Count", "Publications"])
    # Veri satırları
    writer.writerows(data)

print(f"Veriler '{output_file}' dosyasına başarıyla yazıldı!")
