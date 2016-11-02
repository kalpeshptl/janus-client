
module.exports = {

    error: {
        general: {
            unauthorized: function unauthorized(req) {
                return {
                    janus: 'error',
                    transaction: req.transaction,
                    error: {
                        code: 403,
                        reason: 'Unauthorized request (wrong or missing secret/token)'
                    }
                };
            }
        }
    },

    general: {
        info: function info(req) {
            return {
                janus: 'server_info',
                transaction: req.transaction,
                name: 'Janus WebRTC Gateway',
                version: 11,
                version_string: '0.1.1',
                author: 'Meetecho s.r.l.',
                'log-to-stdout': 'true',
                'log-to-file': 'false',
                data_channels: 'true',
                'server-name': 'MyJanusInstance',
                'local-ip': '192.168.0.166',
                ipv6: 'false',
                'ice-tcp': 'true',
                api_secret: 'false',
                auth_token: 'false',
                transports:
                { 'janus.transport.rabbitmq':
                { name: 'JANUS RabbitMQ transport plugin',
                    author: 'Meetecho s.r.l.',
                    description: 'This transport plugin adds RabbitMQ support to the Janus API via rabbitmq-c.',
                    version_string: '0.0.1',
                    version: 1 },
                    'janus.transport.http':
                    { name: 'JANUS REST (HTTP/HTTPS) transport plugin',
                        author: 'Meetecho s.r.l.',
                        description: 'This transport plugin adds REST (HTTP/HTTPS) support to the Janus API via libmicrohttpd.',
                        version_string: '0.0.2',
                        version: 2 },
                    'janus.transport.websockets':
                    { name: 'JANUS WebSockets transport plugin',
                        author: 'Meetecho s.r.l.',
                        description: 'This transport plugin adds WebSockets support to the Janus API via libwebsockets.',
                        version_string: '0.0.1',
                        version: 1 },
                    'janus.transport.pfunix':
                    { name: 'JANUS Unix Sockets transport plugin',
                        author: 'Meetecho s.r.l.',
                        description: 'This transport plugin adds Unix Sockets support to the Janus API.',
                        version_string: '0.0.1',
                        version: 1 } },
                plugins:
                { 'janus.plugin.audiobridge':
                { name: 'JANUS AudioBridge plugin',
                    author: 'Meetecho s.r.l.',
                    description: 'This is a plugin implementing an audio conference bridge for Janus, mixing Opus streams.',
                    version_string: '0.0.8',
                    version: 8 },
                    'janus.plugin.voicemail':
                    { name: 'JANUS VoiceMail plugin',
                        author: 'Meetecho s.r.l.',
                        description: 'This is a plugin implementing a very simple VoiceMail service for Janus, recording Opus streams.',
                        version_string: '0.0.6',
                        version: 6 },
                    'janus.plugin.echotest':
                    { name: 'JANUS EchoTest plugin',
                        author: 'Meetecho s.r.l.',
                        description: 'This is a trivial EchoTest plugin for Janus, just used to showcase the plugin interface.',
                        version_string: '0.0.6',
                        version: 6 },
                    'janus.plugin.recordplay':
                    { name: 'JANUS Record&Play plugin',
                        author: 'Meetecho s.r.l.',
                        description: 'This is a trivial Record&Play plugin for Janus, to record WebRTC sessions and replay them.',
                        version_string: '0.0.3',
                        version: 3 },
                    'janus.plugin.videoroom':
                    { name: 'JANUS VideoRoom plugin',
                        author: 'Meetecho s.r.l.',
                        description: 'This is a plugin implementing a videoconferencing SFU (Selective Forwarding Unit) for Janus, that is an audio/video router.',
                        version_string: '0.0.6',
                        version: 6 },
                    'janus.plugin.videocall':
                    { name: 'JANUS VideoCall plugin',
                        author: 'Meetecho s.r.l.',
                        description: 'This is a simple video call plugin for Janus, allowing two WebRTC peers to call each other through the gateway.',
                        version_string: '0.0.5',
                        version: 5 },
                    'janus.plugin.streaming':
                    { name: 'JANUS Streaming plugin',
                        author: 'Meetecho s.r.l.',
                        description: 'This is a streaming plugin for Janus, allowing WebRTC peers to watch/listen to pre-recorded files or media generated by gstreamer.',
                        version_string: '0.0.5',
                        version: 5 },
                    'janus.plugin.sip':
                    { name: 'JANUS SIP plugin',
                        author: 'Meetecho s.r.l.',
                        description: 'This is a simple SIP plugin for Janus, allowing WebRTC peers to register at a SIP server and call SIP user agents through the gateway.',
                        version_string: '0.0.6',
                        version: 6 } } };
        }
    },

    session: {
        create: function create(req) {
            return { janus: 'success',
                transaction: req.transaction,
                data: { id: 1424579626 } };
        },
        destroy: function destroy(req) {

            return { janus: 'success',
                transaction: req.transaction,
                data: { id: 1424579626 } };
        },
        keepAlive: function keepAlive(req) {

            return { janus: 'ack',
                session_id: req.session_id,
                transaction: req.transaction }
        },
        createVideoRoomHandle: function createVideoRoomHandle(req, handle) {

            return { janus: 'success',
                session_id: req.session_id,
                transaction: req.transaction,
                data: { id: handle } };
        }
    },

    handle: {
        trickle: function detach(req) {
            return { janus: 'ack',
                session_id: req.session_id,
                transaction: req.transaction}
        },
        detach: function detach(req) {
            return { janus: 'success',
                session_id: req.session_id,
                transaction: req.transaction}
        },
        hangup: function hangup(req) {
            return { janus: 'success',
                session_id: req.session_id,
                transaction: req.transaction}
        }
    },

    videoRoomHandle: {
        error: {
            destroy: function destroy(req) {
                return { janus: 'success',
                    session_id: req.session_id,
                    sender: req.handle_id,
                    transaction: req.transaction,
                    plugindata:
                    { plugin: 'janus.plugin.videoroom',
                        data:
                        { videoroom: 'event',
                            error_code: 426,
                            error: 'No such room (' + req.body.room + ')' } } };
            }
        },
        create: function create(req) {
            return { janus: 'success',
                session_id: req.session_id,
                sender: req.handle_id,
                transaction: req.transaction,
                plugindata:
                { plugin: 'janus.plugin.videoroom',
                    data: { videoroom: 'created', room: 2146929290 } } }
        },
        destroy: function destroy(req) {
            return { janus: 'success',
                session_id: req.session_id,
                sender: req.handle_id,
                transaction: req.transaction,
                plugindata:
                { plugin: 'janus.plugin.videoroom',
                    data: { videoroom: 'destroyed', room: 2146929290 } } }
        },
        exists: function exists(req) {
            return {
                janus: 'success',
                session_id: req.session_id,
                sender: req.handle_id,
                transaction: req.transaction,
                plugindata: {
                    plugin: 'janus.plugin.videoroom',
                    data: {
                        videoroom: 'success', room: 2146929290, exists: 'true'
                    }
                }
            }
        },
        list: function list(req) {
            return { 
                janus: 'success',
                session_id: req.session_id,
                sender: req.handle_id,
                transaction: req.transaction,
                plugindata:
                { plugin: 'janus.plugin.videoroom',
                    data: { videoroom: 'success', list: [
                        { room: 2146929290,
                            description: 'Room 1790787516',
                            max_publishers: 3,
                            bitrate: 0,
                            fir_freq: 0,
                            audiocodec: 'opus',
                            videocodec: 'vp8',
                            record: 'false',
                            num_participants: 0 }
                    ] } } }
        }
    }
};
