# Telemedizin Laravel Bundled

Dieses Projekt ist eine Laravel-Anwendung für Telemedizin, die das `telemedizin-bundle` als lokales Composer-Paket integriert.

## Technologie-Stack

- **Backend**: Laravel 11
- **Frontend**: React mit TypeScript
- **Datenbank**: MySQL
- **Docker**: Für die Containerisierung der Anwendung

## Installation mit docker

1. Repository klonen:
```bash
git clone https://github.com/username/test_telemedizin_laravel_bundled.git
cd test_telemedizin_laravel_bundled
```

2. Docker-Container starten:
```bash
	docker-compose -f docker-compose.yml -f docker-compose.override.yml up -d
```
   Seed vom eingebunden `telemedizin-bundle` ausführen:
   ```bash
   docker-compose exec backend  php artisan telemedizin:seed
   ```

3. Backend-Abhängigkeiten installieren:
```bash
docker exec -it telemedizin_backend composer install
```

4. Migrationen und Seeders ausführen:
```bash
docker exec -it telemedizin_backend php artisan migrate --seed
```

5. Frontend-Abhängigkeiten installieren:
```bash
docker exec -it telemedizin_frontend npm install
```

##Tests

###Test ausführen des bundles:
Feature-Tests ausführen:
```bash
   docker-compose exec backend bash -c "cd /var/www/test_bundle_telemedizin && ./vendor/bin/pest --group=feature"
```
Unit-Tests ausführen:
```bash
   docker-compose exec backend bash -c "cd /var/www/test_bundle_telemedizin && ./vendor/bin/pest --group=unit"
```

Alle Tests ausführen:
```bash
   docker-compose exec backend bash -c "cd /var/www/test_bundle_telemedizin && ./vendor/bin/pest"
```

## Verwendung des telemedizin-bundle

Das Projekt verwendet das `telemedizin-bundle` als lokales Composer-Paket. Das Bundle ist unter `../test_bundle_telemedizin` zu finden und enthält folgende Komponenten:

- **Modelle**: Doctor, Appointment, TimeSlot, Specialization
- **Migrations**: Erstellt die entsprechenden Tabellen in der Datenbank
- **Routes**: API-Routen für den Zugriff auf die Ressourcen
- **Controller**: API-Controller für die Ressourcen
- **Config**: Konfigurationsoptionen für das Bundle

### Integration des Bundles

Das Bundle wurde über Composer als lokales Repository eingebunden:

```json
"repositories": [
    {
        "type": "path",
        "url": "../../test_bundle_telemedizin",
        "options": {
            "symlink": true
        }
    }
],
"require": {
    "php": "^8.2",
    "laravel/framework": "^11.0",
    "laravel/tinker": "^2.10.1",
    "telemedizin/telemedizin-bundle": "dev-main"
}
```

### Veröffentlichung der Bundle-Assets

Um die Assets des Bundles zu veröffentlichen, kann folgender Befehl verwendet werden:

```bash
php artisan vendor:publish --provider="Telemedizin\TelemedizinBundle\TelemedizinServiceProvider"
```

Dies veröffentlicht:
- Konfigurationsdateien in `config/telemedizin.php`
- Migrationsdateien in `database/migrations/`

## API-Endpunkte

Das Bundle stellt die folgenden API-Endpunkte bereit:

### Fachbereiche

- `GET /api/telemedizin/specializations` - Alle Fachbereiche abrufen
- `POST /api/telemedizin/specializations` - Neuen Fachbereich erstellen
- `GET /api/telemedizin/specializations/{id}` - Fachbereich abrufen
- `PUT /api/telemedizin/specializations/{id}` - Fachbereich aktualisieren
- `DELETE /api/telemedizin/specializations/{id}` - Fachbereich löschen

### Ärzte

- `GET /api/telemedizin/doctors` - Alle Ärzte abrufen
- `POST /api/telemedizin/doctors` - Neuen Arzt erstellen
- `GET /api/telemedizin/doctors/{id}` - Arzt abrufen
- `PUT /api/telemedizin/doctors/{id}` - Arzt aktualisieren
- `DELETE /api/telemedizin/doctors/{id}` - Arzt löschen

### Zeitslots

- `GET /api/telemedizin/timeslots` - Alle verfügbaren Zeitslots abrufen
- `POST /api/telemedizin/timeslots` - Neuen Zeitslot erstellen
- `GET /api/telemedizin/timeslots/{id}` - Zeitslot abrufen
- `PUT /api/telemedizin/timeslots/{id}` - Zeitslot aktualisieren
- `DELETE /api/telemedizin/timeslots/{id}` - Zeitslot löschen
- `GET /api/telemedizin/doctors/{doctor}/timeslots` - Zeitslots für einen Arzt abrufen
- `POST /api/telemedizin/doctors/{doctor}/timeslots/generate` - Zeitslots für einen Arzt generieren

### Termine

- `GET /api/telemedizin/appointments` - Alle Termine abrufen
- `POST /api/telemedizin/appointments` - Neuen Termin erstellen
- `GET /api/telemedizin/appointments/{id}` - Termin abrufen
- `PUT /api/telemedizin/appointments/{id}` - Termin aktualisieren (Status ändern)
- `DELETE /api/telemedizin/appointments/{id}` - Termin löschen
- `GET /api/telemedizin/appointments/patient/{email}` - Termine für einen Patienten abrufen
- `PATCH /api/telemedizin/appointments/{id}/cancel` - Termin stornieren


Doku des eingebunden Bundles (./)