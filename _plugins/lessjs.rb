module Jekyll
  
  class LessCssFile < StaticFile
    def write(dest)
      # do nothing
    end
  end

  class LessJsGenerator < Generator
    safe true
    priority :low
    
    def generate(site)
      src_root = site.config['source']
      dest_root = site.config['destination']
      less_ext = /\.less$/i
      
      site.static_files.each do |sf|
        next if not sf.path =~ less_ext
        
        less_path = sf.path
        css_path = less_path.gsub(less_ext, '.css').gsub(src_root, dest_root)
        css_dir = File.dirname(css_path)
        css_dir_relative = css_dir.gsub(dest_root, '')
        css_name = File.basename(css_path)
        
        FileUtils.mkdir_p(css_dir)

        begin
          command = ['lessc',
                     less_path, 
                     css_path
                     ].join(' ')
                     
          puts 'Compiling LESS: ' + command
                     
          `#{command}`
          
          raise "LESS compilation error" if $?.to_i != 0
        end
        
        # Add this output file so it won't be cleaned
        site.static_files << LessCssFile.new(site, site.source, css_dir_relative, css_name)
      end
    end
    
  end
end