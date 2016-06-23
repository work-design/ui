require 'pry'
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

      raise "Missing 'lessc' config in site configuration" unless site.config['lessc']

      begin
        command = site.config['lessc']
        puts 'Compiling LESS: ' + command

        `#{command}`

        raise "LESS compilation error" if $?.to_i != 0
      end

    end
    
  end
end