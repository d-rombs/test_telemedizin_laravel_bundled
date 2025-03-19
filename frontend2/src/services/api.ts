import axios from 'axios';
import { 
  Specialization, 
  Doctor, 
  TimeSlot, 
  Appointment, 
  TimeSlotCreationParams 
} from '../types';

//const API_URL = 'http://localhost:8000/api';
const API_URL = 'http://localhost:8000/api/telemedizin';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Specialization API
export const getSpecializations = async (): Promise<Specialization[]> => {
  const response = await api.get('/specializations');
  return response.data.data || response.data;
};

// Doctor API
export const getDoctors = async (): Promise<Doctor[]> => {
  const response = await api.get('/doctors');
  return response.data.data || response.data;
};

export const searchDoctors = async (query: string): Promise<Doctor[]> => {
  try {
    const response = await api.get(`/doctors/search?query=${query}`);
    return response.data.data || response.data;
  } catch (error) {
    console.error('Fehler bei der Suche nach Ärzten:', error);
    
    const allDoctors = await getDoctors();
    
    if (!query) return allDoctors;
    
    const lowerQuery = query.toLowerCase();
    return allDoctors.filter(doctor => 
      doctor.name.toLowerCase().includes(lowerQuery)
    );
  }
};

export const getDoctor = async (id: number): Promise<Doctor> => {
  const response = await api.get(`/doctors/${id}`);
  return response.data.data || response.data;
};

// TimeSlot API
export const getAvailableTimeSlots = async (doctorId: number): Promise<TimeSlot[]> => {
  const response = await api.get(`/doctors/${doctorId}/timeslots`);
  return response.data.data || response.data;
};

export const checkTimeSlotAvailability = async (id: number): Promise<{ is_available: boolean, message?: string }> => {
  try {
    const response = await api.get(`/timeslots/check-availability/${id}`);
    const data = response.data.data || response.data;
    return { 
      is_available: data.is_available,
      message: data.message
    };
  } catch (error) {
    console.error('Fehler beim Überprüfen der Zeitslot-Verfügbarkeit:', error);
    return { 
      is_available: false,
      message: 'Fehler bei der Verfügbarkeitsprüfung.' 
    };
  }
};

export const createMultipleTimeSlots = async (params: TimeSlotCreationParams): Promise<TimeSlot[]> => {
  try {
    const response = await api.post(`/doctors/${params.doctor_id}/timeslots/generate`, params);
    return response.data.data || response.data;
  } catch (error) {
    console.error('Fehler beim Generieren von Zeitslots:', error);
    throw error;
  }
};

// Appointment API
export const createAppointment = async (appointment: Partial<Appointment>, timeSlotId: number): Promise<Appointment> => {
  const response = await api.post('/appointments', {
    ...appointment,
    time_slot_id: timeSlotId,
  });
  return response.data.data || response.data;
};

export const getAppointmentsByEmail = async (email: string): Promise<Appointment[]> => {
  const response = await api.get(`/appointments/patient/${email}`);
  return response.data.data || response.data;
};

export const cancelAppointment = async (id: number): Promise<Appointment> => {
  const response = await api.patch(`/appointments/${id}/cancel`);
  return response.data.data || response.data;
};

// Echtzeit-Verfügbarkeitsprüfung mit Polling alle 5 Sekunden
export const setupRealTimeAvailabilityCheck = (
  timeSlotId: number, 
  onUpdate: (available: boolean, message?: string) => void,
  interval = 5000
): { stop: () => void } => {
  let isRunning = true;
  
  const checkInterval = setInterval(async () => {
    if (!isRunning) return;
    
    try {
      const result = await checkTimeSlotAvailability(timeSlotId);
      onUpdate(result.is_available, result.message);
      
      if (!result.is_available) {
        clearInterval(checkInterval);
      }
    } catch (error) {
      console.error('Fehler bei der Echtzeit-Verfügbarkeitsprüfung:', error);
    }
  }, interval);
  
  return {
    stop: () => {
      isRunning = false;
      clearInterval(checkInterval);
    }
  };
};

export default api; 