import React, { useEffect, useMemo, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';

const MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const DARK = '#1A1C1E';
const GREY = '#78909C';

function parseYmd(iso) {
  const parts = iso.split('-');
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10) || 1;
  return { year, month, day };
}

function toYmd(year, monthZeroBased, dayNumber) {
  const monthPart = String(monthZeroBased + 1).padStart(2, '0');
  const dayPart = String(dayNumber).padStart(2, '0');
  return `${year}-${monthPart}-${dayPart}`;
}

function formatMonthYearLabel(dateString) {
  const parts = dateString.split('-');
  if (parts.length < 2) {
    return dateString;
  }
  const year = parts[0];
  const monthIndex = parseInt(parts[1], 10) - 1;
  if (monthIndex < 0 || monthIndex > 11) {
    return dateString;
  }
  return `${MONTH_NAMES[monthIndex]} ${year}`;
}

function buildMonthCells(viewYear, viewMonthZero) {
  const daysInMonth = new Date(viewYear, viewMonthZero + 1, 0).getDate();
  const startPad = new Date(viewYear, viewMonthZero, 1).getDay();
  const cells = [];
  for (let indexPad = 0; indexPad < startPad; indexPad += 1) {
    cells.push(null);
  }
  for (let dayNumber = 1; dayNumber <= daysInMonth; dayNumber += 1) {
    cells.push(dayNumber);
  }
  const trailing = (7 - (cells.length % 7)) % 7;
  for (let indexTrailing = 0; indexTrailing < trailing; indexTrailing += 1) {
    cells.push(null);
  }
  return cells;
}

function MonthGrid({ viewYear, viewMonthZero, selectedDate, onPickDay }) {
  const cells = useMemo(
    () => buildMonthCells(viewYear, viewMonthZero),
    [viewYear, viewMonthZero],
  );

  const rows = useMemo(() => {
    const result = [];
    for (let start = 0; start < cells.length; start += 7) {
      result.push(cells.slice(start, start + 7));
    }
    return result;
  }, [cells]);

  return (
    <View style={styles.grid}>
      <View style={styles.weekdayRow}>
        {WEEKDAY_LABELS.map((label) => (
          <Text key={label} style={styles.weekdayLabel}>
            {label}
          </Text>
        ))}
      </View>
      {rows.map((row, rowIndex) => (
        <View key={`row-${rowIndex}`} style={styles.weekRow}>
          {row.map((dayNumber, colIndex) => {
            if (dayNumber == null) {
              return (
                <View
                  key={`empty-${colIndex}`}
                  style={[styles.dayCell, styles.dayCellEmpty]}
                />
              );
            }
            const fullDate = toYmd(viewYear, viewMonthZero, dayNumber);
            const isSelected = fullDate === selectedDate;
            return (
              <TouchableOpacity
                key={fullDate}
                style={[styles.dayCell, isSelected && styles.dayCellSelected]}
                onPress={() => onPickDay(fullDate)}
                activeOpacity={0.8}
              >
                <Text
                  style={[styles.dayText, isSelected && styles.dayTextSelected]}
                >
                  {dayNumber}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </View>
  );
}

/**
 * Month calendar in a modal (no react-native-calendars / recyclerlistview).
 */
export default function Calender({ selectedDate, onDateChange }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [viewYear, setViewYear] = useState(() => parseYmd(selectedDate).year);
  const [viewMonth, setViewMonth] = useState(() => parseYmd(selectedDate).month);

  useEffect(() => {
    if (modalVisible) {
      const parsed = parseYmd(selectedDate);
      setViewYear(parsed.year);
      setViewMonth(parsed.month);
    }
  }, [modalVisible, selectedDate]);

  const label = useMemo(
    () => formatMonthYearLabel(selectedDate),
    [selectedDate],
  );

  const monthTitle = `${MONTH_NAMES[viewMonth]} ${viewYear}`;

  function goPrevMonth() {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((previousYear) => previousYear - 1);
    } else {
      setViewMonth((previousMonth) => previousMonth - 1);
    }
  }

  function goNextMonth() {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((previousYear) => previousYear + 1);
    } else {
      setViewMonth((previousMonth) => previousMonth + 1);
    }
  }

  function handlePickDay(iso) {
    onDateChange(iso);
    setModalVisible(false);
  }

  return (
    <>
      <TouchableOpacity
        style={styles.trigger}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
      >
        <Text style={styles.triggerLabel}>{label}</Text>
        <Text style={styles.chevron}>▾</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalBackdrop}>
            <TouchableWithoutFeedback>
              <View style={styles.sheet}>
                <Text style={styles.sheetTitle}>Select date</Text>

                <View style={styles.monthNav}>
                  <TouchableOpacity
                    onPress={goPrevMonth}
                    style={styles.monthNavBtn}
                    hitSlop={8}
                  >
                    <Text style={styles.monthNavArrow}>‹</Text>
                  </TouchableOpacity>
                  <Text style={styles.monthTitle}>{monthTitle}</Text>
                  <TouchableOpacity
                    onPress={goNextMonth}
                    style={styles.monthNavBtn}
                    hitSlop={8}
                  >
                    <Text style={styles.monthNavArrow}>›</Text>
                  </TouchableOpacity>
                </View>

                <MonthGrid
                  viewYear={viewYear}
                  viewMonthZero={viewMonth}
                  selectedDate={selectedDate}
                  onPickDay={handlePickDay}
                />

                <TouchableOpacity
                  style={styles.doneButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.doneButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  triggerLabel: {
    fontSize: 14,
    color: GREY,
    fontWeight: '500',
  },
  chevron: {
    fontSize: 12,
    color: GREY,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  sheet: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingTop: 16,
    paddingBottom: 12,
    paddingHorizontal: 8,
  },
  sheetTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: DARK,
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  monthNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  monthNavBtn: {
    padding: 8,
    minWidth: 40,
    alignItems: 'center',
  },
  monthNavArrow: {
    fontSize: 28,
    color: DARK,
    fontWeight: '300',
  },
  monthTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: DARK,
  },
  grid: {
    marginBottom: 8,
  },
  weekdayRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  weekdayLabel: {
    flex: 1,
    textAlign: 'center',
    fontSize: 11,
    fontWeight: '600',
    color: GREY,
    paddingVertical: 4,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayCell: {
    flex: 1,
    aspectRatio: 1,
    maxWidth: 44,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 2,
    borderRadius: 8,
  },
  dayCellEmpty: {
    opacity: 0,
  },
  dayCellSelected: {
    backgroundColor: DARK,
  },
  dayText: {
    fontSize: 14,
    color: DARK,
    fontWeight: '500',
  },
  dayTextSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  doneButton: {
    alignSelf: 'center',
    marginTop: 8,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  doneButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: DARK,
  },
});
