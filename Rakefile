require 'json'

desc 'Prepares a zip file ready for upload to Chrome Web Store'
task :release do
  manifest = JSON.parse(IO.read('./manifest.json'))
  output_filename = "backbone-devtools-#{manifest['version']}.zip"
  files = %w[ manifest.json html css js img lib ] + Dir['templates/*.js']
  command = %W[ zip -r #{output_filename} ] + files
  `#{command.join(' ')}`
end
