CREATE TABLE IF NOT EXISTS tareas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  descripcion TEXT,
  prioridad ENUM('baja', 'media', 'alta') NOT NULL DEFAULT 'media',
  estado ENUM('pendiente', 'en progreso', 'completada') NOT NULL DEFAULT 'pendiente',
  fechaDeVencimiento DATETIME,
  fechaDeFinalizacion DATETIME,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
