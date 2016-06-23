module Jekyll
  module AssetFilter

    def date_to_human(time)
      time.getlocal.strftime "%Y-%m-%d"
    end

  end
end

Liquid::Template.register_filter(Jekyll::AssetFilter)
