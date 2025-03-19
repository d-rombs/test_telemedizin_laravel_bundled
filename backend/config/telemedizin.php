<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Telemedizin Bundle Konfiguration
    |--------------------------------------------------------------------------
    |
    | Hier können Sie verschiedene Einstellungen für das Telemedizin-Bundle konfigurieren.
    |
    */

    // Zeitslot-Einstellungen
    'time_slots' => [
        'duration' => 30, // Standarddauer eines Zeitslots in Minuten
        'workday_start' => '08:00', // Beginn des Arbeitstages
        'workday_end' => '18:00', // Ende des Arbeitstages
    ],

    // Termin-Einstellungen
    'appointments' => [
        'max_per_day' => 10, // Maximale Anzahl an Terminen pro Tag für einen Arzt
        'status_types' => [
            'scheduled',
            'completed',
            'cancelled'
        ],
    ],

    // Routen-Präfix
    'routes' => [
        'prefix' => 'api/telemedizin',
        'middleware' => ['api'],
    ],
]; 