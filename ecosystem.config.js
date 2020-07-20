module.exports = {
    apps: [
      {
        name: 'React APP',
        script: './server-build/index.js',
        instances: 2,
        exec_mode: 'cluster',
        autorestart: true,
        watch: false,
        merge_logs: true,
        max_memory_restart: '1500M',
        log_date_format: 'YYYY-MM-DD HH:mm Z'
      }
    ]
  };