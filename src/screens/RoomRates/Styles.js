import { Platform, StyleSheet } from 'react-native';

const DARK = '#1A1C1E';
const GREY_LABEL = '#78909C';
const TAB_BORDER = '#B0BEC5';

const CELL_BG = '#DAE7FB';

const GRID = '#E0E0E0';

const SECTION_BG = '#ECEFF1';

export const ROOM_NAME_WIDTH = 132;
export const DATE_COL_WIDTH = 72;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  screenHeaderSticky: {
    flexShrink: 0,
    paddingTop: 16,
    backgroundColor: '#FFFFFF',
    zIndex: 2,
  },
  pageScroll: {
    flex: 1,
  },
  headerRow: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  logoImage: {
    height: 36,
    width: 140,
    alignSelf: 'flex-start',
  },
  headerRule: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 16,
  },
  tabListWrap: {
    alignSelf: 'stretch',
    flexGrow: 0,
    flexShrink: 0,
  },
  tabFlatList: {
    flexGrow: 0,
  },
  tabListContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
    alignItems: 'center',
    flexGrow: 0,
  },
  tabSeparator: {
    width: 10,
  },
  tabItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: TAB_BORDER,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedTab: {
    backgroundColor: DARK,
    borderColor: DARK,
  },
  tabText: {
    color: DARK,
    fontSize: 15,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  selectedText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  navRule: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#ECEFF1',
    marginHorizontal: 16,
    marginBottom: 4,
  },
  bodyPad: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  dashboardSection: {
    marginTop: 0,
  },
  dashboardTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: DARK,
    marginBottom: 16,
  },
  dashboardRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  dropdownGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 10,
  },
  dropdownPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dropdownText: {
    fontSize: 14,
    color: GREY_LABEL,
    fontWeight: '500',
  },
  chevron: {
    fontSize: 12,
    color: GREY_LABEL,
  },
  actionGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 8,
  },
  outlineButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: DARK,
    backgroundColor: '#FFFFFF',
  },
  outlineButtonText: {
    fontSize: 12,
    color: DARK,
    fontWeight: '500',
  },
  allRoomsBar: {
    marginTop: 16,
    marginBottom: 8,
    backgroundColor: DARK,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  allRoomsText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  allRoomsChevron: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  tableHorizontal: {
    paddingBottom: 4,
  },
  tableInner: {
    paddingBottom: 2,
  },

  tableFrame: {
    alignSelf: 'flex-start',
  },
  tableRowDivider: {
    borderBottomWidth: 1,
    borderColor: GRID,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  tableHeaderRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  headerCornerCell: {
    width: ROOM_NAME_WIDTH,
    justifyContent: 'flex-end',
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  cornerLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: GREY_LABEL,
  },
  dateHeaderCell: {
    width: DATE_COL_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  dateWeekday: {
    fontSize: 11,
    fontWeight: '600',
    color: GREY_LABEL,
  },
  dateDay: {
    fontSize: 15,
    fontWeight: '700',
    color: DARK,
  },
  sectionBar: {
    backgroundColor: SECTION_BG,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  sectionLabel: {
    fontWeight: '700',
    fontSize: 13,
    color: DARK,
  },
  nameCell: {
    width: ROOM_NAME_WIDTH,
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 6,
  },
  roomName: {
    fontSize: 12,
    color: '#37474F',
  },
  bodyDateCell: {
    width: DATE_COL_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 3,
    paddingHorizontal: 2,
  },
  rateCell: {
    backgroundColor: CELL_BG,
    borderRadius: 8,
    minWidth: 56,
    paddingVertical: 5,
    paddingHorizontal: 2,
    alignItems: 'center',
  },
  rateText: {
    fontSize: 13,
    fontWeight: '700',
  },
  footerBlock: {
    marginTop: 0,
    width: '100%',
  },
  
  inventoryFooterSticky: {
    borderTopWidth: 1,
    borderTopColor: GRID,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 4,
    ...Platform.select({
      ios: {
        paddingBottom: 18,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
      android: {
        paddingBottom: 8,
        elevation: 6,
      },
      default: { paddingBottom: 8 },
    }),
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    width: '100%',
  },

  footerFixedLayout: {
    width: '100%',
    alignSelf: 'stretch',
  },
  footerLabelBox: {
    borderRadius: 8,
    borderWidth: 1,
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  footerLabelCell: {
    flexBasis: 108,
    flexGrow: 0,
    flexShrink: 1,
    minWidth: 80,
    justifyContent: 'center',
    paddingVertical: 3,
    paddingHorizontal: 2,
  },
  footerDataCellOuter: {
    flex: 1,
    minWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 3,
    paddingHorizontal: 1,
  },
  footerLabelText: {
    fontSize: 12,
    fontWeight: '600',
    color: DARK,
  },

  summaryFooterPlain: {
    textAlign: 'center',
    fontWeight: '700',
    color: '#2E7D32',
    fontSize: 13,
  },
  stepperInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
    paddingHorizontal: 2,
    alignSelf: 'center',
  },
  stepperSide: {
    paddingHorizontal: 3,
    paddingVertical: 1,
  },
  stepperControlOrange: {
    fontWeight: '600',
    color: '#E65100',
    fontSize: 15,
  },
  stepperValueOrange: {
    fontWeight: '700',
    color: '#E65100',
    minWidth: 14,
    textAlign: 'center',
    fontSize: 13,
  },
  stepperControlBlue: {
    fontWeight: '600',
    color: '#1565C0',
    fontSize: 15,
  },
  stepperValueBlue: {
    fontWeight: '700',
    color: '#1565C0',
    minWidth: 14,
    textAlign: 'center',
    fontSize: 13,
  },
});
