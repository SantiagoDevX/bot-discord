const ranges = {
  900: "Mentor",
  460: "Senior",
  250: "Junior",
  120: "Novato",
};

const calculateRange = (xp) => {
  const sortedRanges = Object.entries(ranges).sort((a, b) => b[0] - a[0]); // Ordenamos de mayor a menor

  for (const [minXp, rangeName] of sortedRanges) {
    if (xp >= minXp) {
      return rangeName;
    }
  }
  // Si XP es menor que el mínimo (esto no debería pasar si 120 es el mínimo)
  return "Novato";
};
