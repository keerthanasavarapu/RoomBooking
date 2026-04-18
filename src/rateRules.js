const STANDARD_EP_SINGLE = 2000;
const DELUXE_EP_SINGLE = 3000;
const SUPERIOR_EP_SINGLE = 4000;

const STANDARD_EP_DOUBLE_EXTRA = 500;
const DELUXE_EP_DOUBLE_EXTRA = 200;

function epPlusPerPerson(epRate, persons, perPersonExtra) {
  return epRate + perPersonExtra * persons;
}

function standardEpDouble() {
  return STANDARD_EP_SINGLE + STANDARD_EP_DOUBLE_EXTRA;
}

function deluxeEpDouble() {
  return DELUXE_EP_SINGLE + DELUXE_EP_DOUBLE_EXTRA;
}

const RATES_BY_ID = {
  std_ep_sg: STANDARD_EP_SINGLE,
  std_ep_db: standardEpDouble(),
  std_cp_sg: epPlusPerPerson(STANDARD_EP_SINGLE, 1, 500),
  std_cp_db: epPlusPerPerson(standardEpDouble(), 2, 500),
  std_map_sg: epPlusPerPerson(STANDARD_EP_SINGLE, 1, 800),

  dlx_ep_sg: DELUXE_EP_SINGLE,
  dlx_ep_db: deluxeEpDouble(),
  dlx_cp_sg: epPlusPerPerson(DELUXE_EP_SINGLE, 1, 300),
  dlx_cp_db: epPlusPerPerson(deluxeEpDouble(), 2, 300),
  dlx_map_sg: epPlusPerPerson(DELUXE_EP_SINGLE, 1, 500),

  sup_ep_sg: SUPERIOR_EP_SINGLE,
  sup_cp_sg: epPlusPerPerson(SUPERIOR_EP_SINGLE, 1, 800),

  mhr_ep_sg: 5000,
};

export function getRateAmount(roomId) {
  return RATES_BY_ID[roomId] ?? 0;
}
export function colorForRate(amount) {
  if (amount <= 2200) {
    return '#2E7D32';
  }
  if (amount <= 3200) {
    return '#F57C00';
  }
  if (amount <= 4500) {
    return '#7B1FA2';
  }
  return '#1565C0';
}

export function inventoryIsAllowed(snapshot) {
  const { totalRooms, available, blocked, released } = snapshot;
  if (available > totalRooms) {
    return false;
  }
  if (blocked > available) {
    return false;
  }
  if (released > available) {
    return false;
  }
  return true;
}
