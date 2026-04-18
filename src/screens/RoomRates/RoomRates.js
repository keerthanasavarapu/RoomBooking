import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { styles, ROOM_NAME_WIDTH, DATE_COL_WIDTH } from './Styles';
import Calender from '../components/calender';
import {
  getRateAmount,
  colorForRate,
  inventoryIsAllowed,
} from '../../rateRules';

const DATE_COLUMNS = [
  { key: 'd0', weekday: 'FRI', day: 13 },
  { key: 'd1', weekday: 'SAT', day: 14 },
  { key: 'd2', weekday: 'SUN', day: 15 },
  { key: 'd3', weekday: 'MON', day: 16 },
];

const TABLE_MIN_WIDTH =
  ROOM_NAME_WIDTH + DATE_COL_WIDTH * DATE_COLUMNS.length;

const ROOM_ROWS = [
  { kind: 'section', label: 'Standard Room' },
  { kind: 'room', id: 'std_ep_sg', label: 'Standard EP Single' },
  { kind: 'room', id: 'std_cp_sg', label: 'Standard CP Single' },
  { kind: 'room', id: 'std_map_sg', label: 'Standard MAP Single' },
  { kind: 'section', label: 'Deluxe Room' },
  { kind: 'room', id: 'dlx_ep_sg', label: 'Deluxe EP Single' },
  { kind: 'room', id: 'dlx_ep_db', label: 'Deluxe EP Double' },
  { kind: 'room', id: 'dlx_cp_sg', label: 'Deluxe CP Single' },
  { kind: 'room', id: 'dlx_cp_db', label: 'Deluxe CP Double' },
  { kind: 'room', id: 'dlx_map_sg', label: 'Deluxe MAP Single' },
  { kind: 'section', label: 'Superior Room' },
  { kind: 'room', id: 'sup_ep_sg', label: 'Superior EP Single' },
  { kind: 'room', id: 'sup_cp_sg', label: 'Superior CP Single' },
  { kind: 'section', label: 'Maharani Executive' },
  { kind: 'room', id: 'mhr_ep_sg', label: 'Maharani Executive EP S.' },
];

const tabs = [
  { id: '1', title: 'Reservations' },
  { id: '2', title: 'Room View' },
  { id: '3', title: 'Room Rates' },
  { id: '4', title: 'Test' },
];

const START_INVENTORY_BY_DAY = [
  { totalRooms: 10, available: 6, blocked: 2, released: 4 },
  { totalRooms: 10, available: 4, blocked: 3, released: 1 },
  { totalRooms: 10, available: 7, blocked: 1, released: 2 },
  { totalRooms: 10, available: 5, blocked: 4, released: 1 },
];

function TabSeparator() {
  return <View style={styles.tabSeparator} />;
}

const RoomRates = () => {
  const [selectedId, setSelectedId] = useState('3');
  const [calendarDate, setCalendarDate] = useState('2026-03-01');
  const [dayInventory, setDayInventory] = useState(START_INVENTORY_BY_DAY);

  const renderItem = ({ item }) => {
    const isSelected = item.id === selectedId;
    return (
      <TouchableOpacity
        style={[styles.tabItem, isSelected && styles.selectedTab]}
        onPress={() => setSelectedId(item.id)}
        activeOpacity={0.85}
      >
        <Text style={[styles.tabText, isSelected && styles.selectedText]}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  const changeBlocked = useCallback(
    (dayIndex, direction) => {
      setDayInventory((previous) => {
        const current = previous[dayIndex];
        let next;
        if (direction === 'up') {
          next = {
            ...current,
            blocked: current.blocked + 1,
            available: current.available - 1,
          };
        } else {
          if (current.blocked <= 0) {
            return previous;
          }
          next = {
            ...current,
            blocked: current.blocked - 1,
            available: current.available + 1,
          };
        }
        if (!inventoryIsAllowed(next)) {
          return previous;
        }
        const copy = [...previous];
        copy[dayIndex] = next;
        return copy;
      });
    },
    [],
  );

  const changeReleased = useCallback(
    (dayIndex, direction) => {
      setDayInventory((previous) => {
        const current = previous[dayIndex];
        let next;
        if (direction === 'up') {
          next = {
            ...current,
            released: current.released + 1,
            available: Math.min(current.totalRooms, current.available + 1),
          };
        } else {
          if (current.released <= 0) {
            return previous;
          }
          next = {
            ...current,
            released: current.released - 1,
            available: Math.max(0, current.available - 1),
          };
        }
        if (!inventoryIsAllowed(next)) {
          return previous;
        }
        const copy = [...previous];
        copy[dayIndex] = next;
        return copy;
      });
    },
    [],
  );

  return (
    <View style={styles.container}>
      <View style={styles.screenHeaderSticky}>
        <View style={styles.headerRow}>
          <Image
            source={require('../../assets/images/xipperLogo.png')}
            style={styles.logoImage}
            resizeMode="contain"
            accessibilityLabel="Xipper logo"
          />
        </View>
        <View style={styles.headerRule} />
      </View>

      <ScrollView
        style={styles.pageScroll}
        nestedScrollEnabled
        showsVerticalScrollIndicator
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.tabListWrap}>
          <FlatList
            data={tabs}
            horizontal
            style={styles.tabFlatList}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            ItemSeparatorComponent={TabSeparator}
            contentContainerStyle={styles.tabListContent}
          />
        </View>

        <View style={styles.navRule} />

        <View style={styles.bodyPad}>
          <View style={styles.dashboardSection}>
            <Text style={styles.dashboardTitle}>Room Dashboard</Text>

            <View style={styles.dashboardRow}>
              <View style={styles.dropdownGroup}>
                <View style={styles.dropdownPill}>
                  <Calender
                    selectedDate={calendarDate}
                    onDateChange={setCalendarDate}
                  />
                </View>
                <TouchableOpacity
                  style={styles.dropdownPill}
                  activeOpacity={0.7}
                >
                  <Text style={styles.dropdownText}>Weekly</Text>
                  <Text style={styles.chevron}>▾</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.actionGroup}>
                <TouchableOpacity
                  style={styles.outlineButton}
                  activeOpacity={0.7}
                >
                  <Text style={styles.outlineButtonText}>
                    Bulk Rate Update
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.outlineButton}
                  activeOpacity={0.7}
                >
                  <Text style={styles.outlineButtonText}>Room Block</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.allRoomsBar} activeOpacity={0.85}>
            <Text style={styles.allRoomsText}>All Rooms</Text>
            <Text style={styles.allRoomsChevron}>▾</Text>
          </TouchableOpacity>

          <ScrollView
            horizontal
            nestedScrollEnabled
            showsHorizontalScrollIndicator
            contentContainerStyle={styles.tableHorizontal}
          >
            <View
              style={[
                styles.tableInner,
                styles.tableFrame,
                { minWidth: TABLE_MIN_WIDTH },
              ]}
            >
              <View style={[styles.tableHeaderRow, styles.tableRowDivider]}>
                <View style={styles.headerCornerCell}>
                  <Text style={styles.cornerLabel}>ROOM TYPE</Text>
                </View>
                {DATE_COLUMNS.map((column) => (
                  <View key={column.key} style={styles.dateHeaderCell}>
                    <Text style={styles.dateWeekday}>{column.weekday}</Text>
                    <Text style={styles.dateDay}>{column.day}</Text>
                  </View>
                ))}
              </View>

              {ROOM_ROWS.map((row, index) => {
                if (row.kind === 'section') {
                  return (
                    <View
                      key={`${row.label}-${index}`}
                      style={[
                        styles.sectionBar,
                        styles.tableRowDivider,
                        { width: TABLE_MIN_WIDTH },
                      ]}
                    >
                      <Text style={styles.sectionLabel}>{row.label}</Text>
                    </View>
                  );
                }
                const amount = getRateAmount(row.id);
                const accent = colorForRate(amount);
                return (
                  <View
                    key={row.id}
                    style={[styles.tableRow, styles.tableRowDivider]}
                  >
                    <View style={styles.nameCell}>
                      <Text style={styles.roomName} numberOfLines={2}>
                        {row.label}
                      </Text>
                    </View>
                    {DATE_COLUMNS.map((column) => (
                      <View key={column.key} style={styles.bodyDateCell}>
                        <View
                          style={[styles.rateCell, { borderColor: accent }]}
                        >
                          <Text style={[styles.rateText, { color: accent }]}>
                            {amount}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </ScrollView>

      <View style={styles.inventoryFooterSticky}>
        <View style={styles.footerFixedLayout}>
          <View style={styles.footerBlock}>
            <View style={styles.summaryRow}>
              <View style={styles.footerLabelCell}>
                <View style={styles.footerLabelBox}>
                  <Text style={styles.footerLabelText}>Avail/Total</Text>
                </View>
              </View>
              {DATE_COLUMNS.map((column, dayIndex) => {
                const day = dayInventory[dayIndex];
                return (
                  <View key={column.key} style={styles.footerDataCellOuter}>
                    <Text style={styles.summaryFooterPlain}>
                      {day.available}/{day.totalRooms}
                    </Text>
                  </View>
                );
              })}
            </View>

            <View style={styles.summaryRow}>
              <View style={styles.footerLabelCell}>
                <View style={styles.footerLabelBox}>
                  <Text style={styles.footerLabelText}>Block</Text>
                </View>
              </View>
              {DATE_COLUMNS.map((column, dayIndex) => {
                const day = dayInventory[dayIndex];
                return (
                  <View key={column.key} style={styles.footerDataCellOuter}>
                    <View style={styles.stepperInner}>
                      <TouchableOpacity
                        onPress={() => changeBlocked(dayIndex, 'down')}
                        style={styles.stepperSide}
                      >
                        <Text style={styles.stepperControlOrange}>−</Text>
                      </TouchableOpacity>
                      <Text style={styles.stepperValueOrange}>
                        {day.blocked}
                      </Text>
                      <TouchableOpacity
                        onPress={() => changeBlocked(dayIndex, 'up')}
                        style={styles.stepperSide}
                      >
                        <Text style={styles.stepperControlOrange}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </View>

            <View style={styles.summaryRow}>
              <View style={styles.footerLabelCell}>
                <View style={styles.footerLabelBox}>
                  <Text style={styles.footerLabelText}>Release</Text>
                </View>
              </View>
              {DATE_COLUMNS.map((column, dayIndex) => {
                const day = dayInventory[dayIndex];
                return (
                  <View key={column.key} style={styles.footerDataCellOuter}>
                    <View style={styles.stepperInner}>
                      <TouchableOpacity
                        onPress={() => changeReleased(dayIndex, 'down')}
                        style={styles.stepperSide}
                      >
                        <Text style={styles.stepperControlBlue}>−</Text>
                      </TouchableOpacity>
                      <Text style={styles.stepperValueBlue}>
                        {day.released}
                      </Text>
                      <TouchableOpacity
                        onPress={() => changeReleased(dayIndex, 'up')}
                        style={styles.stepperSide}
                      >
                        <Text style={styles.stepperControlBlue}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RoomRates;
