#!/bin/bash

# Vérifie qu'un dossier a été donné en argument
if [ -z "$1" ]; then
  echo "Utilisation : $0 <dossier>"
  exit 1
fi

folder="$1"

# Vérifie que le dossier existe
if [ ! -d "$folder" ]; then
  echo "Erreur : le dossier '$folder' n'existe pas."
  exit 1
fi

# Se place dans le dossier
cd "$folder" || exit

# Liste toutes les images .jpg ou .jpeg (insensible à la casse)
shopt -s nullglob nocaseglob
images=( *.jpg *.jpeg )
shopt -u nocaseglob

# Vérifie qu'il y a des images
if [ ${#images[@]} -eq 0 ]; then
  echo "Aucune image .jpg/.jpeg trouvée dans ce dossier."
  exit 0
fi

# Renomme les fichiers un par un
count=1
for img in "${images[@]}"; do
  new_name=$(printf "IMG_%03d.jpg" "$count")
  mv -v "$img" "$new_name"
  ((count++))
done

echo "✅ Renommage terminé. ${#images[@]} fichiers renommés."
