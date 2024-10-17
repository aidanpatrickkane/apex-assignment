import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const DAYS_OF_WEEK = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

interface CalendarProps {
    currentDay: number;
    currentMonth: number;
    currentYear: number;
    onDaySelect?: (day: number, month: number, year: number) => void;
}

export const Calendar: React.FC<CalendarProps> = ({ currentDay, currentMonth, currentYear, onDaySelect }) => {
    const [selectedDate, setSelectedDate] = useState(new Date(currentYear, currentMonth - 1, currentDay));
    const currentDate = new Date(currentYear, currentMonth - 1, currentDay);
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

    const handleDayPress = (date: Date) => {
        if (date <= currentDate) {
            setSelectedDate(date);
            onDaySelect?.(date.getDate(), date.getMonth() + 1, date.getFullYear());
        }
    };

    return (
        <View style={styles.container}>
          {DAYS_OF_WEEK.map((day, index) => {
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + index);
            const isSelectedDay = date.getDate() === selectedDate.getDate() && 
                                  date.getMonth() === selectedDate.getMonth() && 
                                  date.getFullYear() === selectedDate.getFullYear();
            const isFutureDay = date > currentDate;
    
            return (
              <TouchableOpacity
                key={index}
                style={[styles.dayContainer, isSelectedDay && styles.selectedDayContainer]}
                onPress={() => handleDayPress(date)}
                disabled={isFutureDay}
              >
                <Text style={[
                  styles.dayOfWeek, 
                  isSelectedDay && styles.selectedDayText,
                  isFutureDay && styles.futureDayText
                ]}>{day}</Text>
                <Text style={[
                  styles.date, 
                  isSelectedDay && styles.selectedDayText,
                  isFutureDay && styles.futureDayText
                ]}>
                  {String(date.getDate()).padStart(2, '0')}
                </Text>
                {isSelectedDay && <View style={styles.selectedDayDot} />}
              </TouchableOpacity>
            );
          })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: '#f0f0f0',
      borderRadius: 12,
      padding: 14,
    },
    dayContainer: {
      alignItems: 'center',
      padding: 8,
    },
    selectedDayContainer: {
      backgroundColor: '#333',
      borderRadius: 8,
    },
    dayOfWeek: {
      fontSize: 12,
      color: '#999',
      marginBottom: 2,
    },
    date: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
    },
    selectedDayText: {
        color: '#fff',
      },
      futureDayText: {
          color: '#999',
      },
      selectedDayDot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#fff',
        marginTop: 2,
      },
  });