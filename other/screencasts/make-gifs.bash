for file in *.webm; do
   output_file="${file%.webm}.gif"
  ./ffmpeg -i "$file" -filter:v "setpts=0.1*PTS" "$output_file" -y
done