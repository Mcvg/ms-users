module.exports = (req, res, next) => {
  if (req.path.includes('/ventas')) {
    return res.status(403).json({ message: 'Acceso restringido a servicios de venta de entradas' });
  }
  next();
};