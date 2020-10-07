/************
* Telegram Lib Ver.2
* oleh : bangHasan
*
* ID: MWkhreE4chZ56V_bDwpYUBPvg_do21SJR
* Versi Log, ada di file Version
* Source Code: 
*   https://github.com/banghasan/Telegram-Lib-GAS-V2
*
* Hasanudin H Syafaat
* banghasan@gmail.com
*
* Date : 2020-09-03 17:37:20
*
* * @hasanudinhs
* * @botindonesia
*
***********/


/**
 * Main class Telegram
 * @type {Class} class utama Telegram API Method
 */
class Telegram {

	/**
	*initialize constructor
	*/
    constructor(token) {
        this.token = token;
        this.urlapi = 'https://api.telegram.org/bot';
    }

	/**
	* request api telegram  
    * @param {string} metode yang dipakai
    * @param {array} data yang akan dikirimkan
    * @param {boolean} request metode form
    * @param {boolean} request akan menghasilkan blob
    * @return {string} JSON data    
	*/
    request(method, data, form, blob) {
        if (!this.token) {
            return 'Bot Token is required';
        }
        if (!method) {
            return 'Method is required';
        }
        var options = {
            'method': 'post',
            'contentType': 'application/json'
        };
        if (data) {
            options['payload'] = JSON.stringify(data);            
        }

        if (form) {
            options = { 'method' : 'post' }
            if (data) options['payload'] = data;      
        }
          
        var response = UrlFetchApp.fetch(this.urlapi + this.token + '/' + method, options);
        if (response.getResponseCode() == 200) {
            if (blob) {
                return response.getBlob();
            } else {
                return JSON.parse(response.getContentText());
            }
        }
        return false;
    }

	/**
	*build query from array
	*/
    buildQuery(array) {
        var query = {}
        if (array) {
            for (var index in array) {
                if (array[index]) {
                    var value = array[index];
                    if (index == 'extras') {
                        for (var ix in value) {
                            if (value[ix]) {
                                query[ix] = value[ix];
                            }
                        }
                    } else {
                        query[index] = value;
                    }
                }
            }
        }
        return query;
    }
  
     /**
     * A simple method for testing your bot's auth token. Requires no parameters. Returns basic information about the bot in form of a User object.
     *
     * @return {string} JSON data
     */
    getMe() {
        return this.request('getMe');
    }

	/**
	*Use this method to send text messages. On success, the sent Message is returned.
	*/
    sendMessage(
        chat_id,
        text,
        parse_mode,
        disable_web_page_preview,
        disable_notification,
        reply_to_message_id,
        reply_markup
    ) {
        return this.request('sendMessage', this.buildQuery({
            'chat_id': chat_id,
            'text': text,
            'parse_mode': parse_mode,
            'disable_web_page_preview': disable_web_page_preview,
            'disable_notification': disable_notification,
            'reply_to_message_id': reply_to_message_id,
            'reply_markup': reply_markup
        }));
    }

	/**
	*The Bot API supports basic formatting for messages. You can use bold, italic, underlined and strikethrough text, as well as inline links and pre-formatted code in your bots' messages. Telegram clients will render them accordingly. You can use either markdown-style or HTML-style formatting.Note that Telegram clients will display an alert to the user before opening an inline link ('Open this link?' together with the full URL).Message entities can be nested, providing following restrictions are met:
- If two entities has common characters then one of them is fully contained inside another.
- bold, italic, underline and strikethrough entities can contain and to be contained in any other entities, except pre and code.
- All other entities can't contain each other.Links tg://user?id=<user_id> can be used to mention a user by their ID without using a username. Please note:To use this mode, pass MarkdownV2 in the parse_mode field. Use the following syntax in your message:Please note:To use this mode, pass HTML in the parse_mode field. The following tags are currently supported:Please note:This is a legacy mode, retained for backward compatibility. To use this mode, pass Markdown in the parse_mode field. Use the following syntax in your message:Please note:
	*
	*Formatting options() {
	*}
	*/

	/**
	*Use this method to forward messages of any kind. On success, the sent Message is returned.
	*/
    forwardMessage(
        chat_id,
        from_chat_id,
        disable_notification,
        message_id
    ) {
        return this.request('forwardMessage', this.buildQuery({
            'chat_id': chat_id,
            'from_chat_id': from_chat_id,
            'disable_notification': disable_notification,
            'message_id': message_id
        }));
    }

	/**
	*Use this method to send photos. On success, the sent Message is returned.
	*/
    sendPhoto(
        chat_id,
        photo,
        caption,
        parse_mode,
        disable_notification,
        reply_to_message_id,
        reply_markup
    ) {
        return this.request('sendPhoto', this.buildQuery({
            'chat_id': chat_id,
            'photo': photo,
            'caption': caption,
            'parse_mode': parse_mode,
            'disable_notification': disable_notification,
            'reply_to_message_id': reply_to_message_id,
            'reply_markup': reply_markup
        }));
    }

	/**
	*Use this method to send audio files, if you want Telegram clients to display them in the music player. Your audio must be in the .MP3 or .M4A format. On success, the sent Message is returned. Bots can currently send audio files of up to 50 MB in size, this limit may be changed in the future.For sending voice messages, use the sendVoice method instead.
	*/
    sendAudio(
        chat_id,
        audio,
        caption,
        parse_mode,
        duration,
        performer,
        title,
        thumb,
        disable_notification,
        reply_to_message_id,
        reply_markup
    ) {
        return this.request('sendAudio', this.buildQuery({
            'chat_id': chat_id,
            'audio': audio,
            'caption': caption,
            'parse_mode': parse_mode,
            'duration': duration,
            'performer': performer,
            'title': title,
            'thumb': thumb,
            'disable_notification': disable_notification,
            'reply_to_message_id': reply_to_message_id,
            'reply_markup': reply_markup
        }));
    }

	/**
	*Use this method to send general files. On success, the sent Message is returned. Bots can currently send files of any type of up to 50 MB in size, this limit may be changed in the future.
	*/
    sendDocument(
        chat_id,
        document,
        thumb,
        caption,
        parse_mode,
        disable_notification,
        reply_to_message_id,
        reply_markup
    ) {
        return this.request('sendDocument', this.buildQuery({
            'chat_id': chat_id,
            'document': document,
            'thumb': thumb,
            'caption': caption,
            'parse_mode': parse_mode,
            'disable_notification': disable_notification,
            'reply_to_message_id': reply_to_message_id,
            'reply_markup': reply_markup
        }));
    }

	/**
	*Use this method to send video files, Telegram clients support mp4 videos (other formats may be sent as Document). On success, the sent Message is returned. Bots can currently send video files of up to 50 MB in size, this limit may be changed in the future.
	*/
    sendVideo(
        chat_id,
        video,
        duration,
        width,
        height,
        thumb,
        caption,
        parse_mode,
        supports_streaming,
        disable_notification,
        reply_to_message_id,
        reply_markup
    ) {
        return this.request('sendVideo', this.buildQuery({
            'chat_id': chat_id,
            'video': video,
            'duration': duration,
            'width': width,
            'height': height,
            'thumb': thumb,
            'caption': caption,
            'parse_mode': parse_mode,
            'supports_streaming': supports_streaming,
            'disable_notification': disable_notification,
            'reply_to_message_id': reply_to_message_id,
            'reply_markup': reply_markup
        }));
    }

	/**
	*Use this method to send animation files (GIF or H.264/MPEG-4 AVC video without sound). On success, the sent Message is returned. Bots can currently send animation files of up to 50 MB in size, this limit may be changed in the future.
	*/
    sendAnimation(
        chat_id,
        animation,
        duration,
        width,
        height,
        thumb,
        caption,
        parse_mode,
        disable_notification,
        reply_to_message_id,
        reply_markup
    ) {
        return this.request('sendAnimation', this.buildQuery({
            'chat_id': chat_id,
            'animation': animation,
            'duration': duration,
            'width': width,
            'height': height,
            'thumb': thumb,
            'caption': caption,
            'parse_mode': parse_mode,
            'disable_notification': disable_notification,
            'reply_to_message_id': reply_to_message_id,
            'reply_markup': reply_markup
        }));
    }

	/**
	*Use this method to send audio files, if you want Telegram clients to display the file as a playable voice message. For this to work, your audio must be in an .OGG file encoded with OPUS (other formats may be sent as Audio or Document). On success, the sent Message is returned. Bots can currently send voice messages of up to 50 MB in size, this limit may be changed in the future.
	*/
    sendVoice(
        chat_id,
        voice,
        caption,
        parse_mode,
        duration,
        disable_notification,
        reply_to_message_id,
        reply_markup
    ) {
        return this.request('sendVoice', this.buildQuery({
            'chat_id': chat_id,
            'voice': voice,
            'caption': caption,
            'parse_mode': parse_mode,
            'duration': duration,
            'disable_notification': disable_notification,
            'reply_to_message_id': reply_to_message_id,
            'reply_markup': reply_markup
        }));
    }

	/**
	*As of v.4.0, Telegram clients support rounded square mp4 videos of up to 1 minute long. Use this method to send video messages. On success, the sent Message is returned.
	*/
    sendVideoNote(
        chat_id,
        video_note,
        duration,
        length,
        thumb,
        disable_notification,
        reply_to_message_id,
        reply_markup
    ) {
        return this.request('sendVideoNote', this.buildQuery({
            'chat_id': chat_id,
            'video_note': video_note,
            'duration': duration,
            'length': length,
            'thumb': thumb,
            'disable_notification': disable_notification,
            'reply_to_message_id': reply_to_message_id,
            'reply_markup': reply_markup
        }));
    }

	/**
	*Use this method to send a group of photos or videos as an album. On success, an array of the sent Messages is returned.
	*/
    sendMediaGroup(
        chat_id,
        media,
        disable_notification,
        reply_to_message_id
    ) {
        return this.request('sendMediaGroup', this.buildQuery({
            'chat_id': chat_id,
            'media': media,
            'disable_notification': disable_notification,
            'reply_to_message_id': reply_to_message_id
        }));
    }

	/**
	*Use this method to send point on the map. On success, the sent Message is returned.
	*/
    sendLocation(
        chat_id,
        latitude,
        longitude,
        live_period,
        disable_notification,
        reply_to_message_id,
        reply_markup
    ) {
        return this.request('sendLocation', this.buildQuery({
            'chat_id': chat_id,
            'latitude': latitude,
            'longitude': longitude,
            'live_period': live_period,
            'disable_notification': disable_notification,
            'reply_to_message_id': reply_to_message_id,
            'reply_markup': reply_markup
        }));
    }

	/**
	*Use this method to edit live location messages. A location can be edited until its live_period expires or editing is explicitly disabled by a call to stopMessageLiveLocation. On success, if the edited message was sent by the bot, the edited Message is returned, otherwise True is returned.
	*/
    editMessageLiveLocation(
        chat_id,
        message_id,
        inline_message_id,
        latitude,
        longitude,
        reply_markup
    ) {
        return this.request('editMessageLiveLocation', this.buildQuery({
            'chat_id': chat_id,
            'message_id': message_id,
            'inline_message_id': inline_message_id,
            'latitude': latitude,
            'longitude': longitude,
            'reply_markup': reply_markup
        }));
    }

	/**
	*Use this method to stop updating a live location message before live_period expires. On success, if the message was sent by the bot, the sent Message is returned, otherwise True is returned.
	*/
    stopMessageLiveLocation(
        chat_id,
        message_id,
        inline_message_id,
        reply_markup
    ) {
        return this.request('stopMessageLiveLocation', this.buildQuery({
            'chat_id': chat_id,
            'message_id': message_id,
            'inline_message_id': inline_message_id,
            'reply_markup': reply_markup
        }));
    }

	/**
	*Use this method to send information about a venue. On success, the sent Message is returned.
	*/
    sendVenue(
        chat_id,
        latitude,
        longitude,
        title,
        address,
        foursquare_id,
        foursquare_type,
        disable_notification,
        reply_to_message_id,
        reply_markup
    ) {
        return this.request('sendVenue', this.buildQuery({
            'chat_id': chat_id,
            'latitude': latitude,
            'longitude': longitude,
            'title': title,
            'address': address,
            'foursquare_id': foursquare_id,
            'foursquare_type': foursquare_type,
            'disable_notification': disable_notification,
            'reply_to_message_id': reply_to_message_id,
            'reply_markup': reply_markup
        }));
    }

	/**
	*Use this method to send phone contacts. On success, the sent Message is returned.
	*/
    sendContact(
        chat_id,
        phone_number,
        first_name,
        last_name,
        vcard,
        disable_notification,
        reply_to_message_id,
        reply_markup
    ) {
        return this.request('sendContact', this.buildQuery({
            'chat_id': chat_id,
            'phone_number': phone_number,
            'first_name': first_name,
            'last_name': last_name,
            'vcard': vcard,
            'disable_notification': disable_notification,
            'reply_to_message_id': reply_to_message_id,
            'reply_markup': reply_markup
        }));
    }

	/**
	*Use this method to send a native poll. On success, the sent Message is returned.
	*/
    sendPoll(
        chat_id,
        question,
        options,
        is_anonymous,
        type,
        allows_multiple_answers,
        correct_option_id,
        explanation,
        explanation_parse_mode,
        open_period,
        close_date,
        is_closed,
        disable_notification,
        reply_to_message_id,
        reply_markup
    ) {
        return this.request('sendPoll', this.buildQuery({
            'chat_id': chat_id,
            'question': question,
            'options': options,
            'is_anonymous': is_anonymous,
            'type': type,
            'allows_multiple_answers': allows_multiple_answers,
            'correct_option_id': correct_option_id,
            'explanation': explanation,
            'explanation_parse_mode': explanation_parse_mode,
            'open_period': open_period,
            'close_date': close_date,
            'is_closed': is_closed,
            'disable_notification': disable_notification,
            'reply_to_message_id': reply_to_message_id,
            'reply_markup': reply_markup
        }));
    }

	/**
	*Use this method to send an animated emoji that will display a random value. On success, the sent Message is returned.
	*/
    sendDice(
        chat_id,
        emoji,
        disable_notification,
        reply_to_message_id,
        reply_markup
    ) {
        return this.request('sendDice', this.buildQuery({
            'chat_id': chat_id,
            'emoji': emoji,
            'disable_notification': disable_notification,
            'reply_to_message_id': reply_to_message_id,
            'reply_markup': reply_markup
        }));
    }

	/**
	*Use this method when you need to tell the user that something is happening on the bot's side. The status is set for 5 seconds or less (when a message arrives from your bot, Telegram clients clear its typing status). Returns True on success.Example: The ImageBot needs some time to process a request and upload the image. Instead of sending a text message along the lines of “Retrieving image, please wait…”, the bot may use sendChatAction with action = upload_photo. The user will see a “sending photo” status for the bot.We only recommend using this method when a response from the bot will take a noticeable amount of time to arrive.
	*/
    sendChatAction(
        chat_id,
        action
    ) {
        return this.request('sendChatAction', this.buildQuery({
            'chat_id': chat_id,
            'action': action
        }));
    }

	/**
	*Use this method to get a list of profile pictures for a user. Returns a UserProfilePhotos object.
	*/
    getUserProfilePhotos(
        user_id,
        offset,
        limit
    ) {
        return this.request('getUserProfilePhotos', this.buildQuery({
            'user_id': user_id,
            'offset': offset,
            'limit': limit
        }));
    }

	/**
	*Use this method to get basic info about a file and prepare it for downloading. For the moment, bots can download files of up to 20MB in size. On success, a File object is returned. The file can then be downloaded via the link https://api.telegram.org/file/bot<token>/<file_path>, where <file_path> is taken from the response. It is guaranteed that the link will be valid for at least 1 hour. When the link expires, a new one can be requested by calling getFile again.Note: This function may not preserve the original file name and MIME type. You should save the file's MIME type and name (if available) when the File object is received.
	*/
    getFile(
        file_id
    ) {
        return this.request('getFile', this.buildQuery({
            'file_id': file_id
        }));
    }

	/**
	*Use this method to kick a user from a group, a supergroup or a channel. In the case of supergroups and channels, the user will not be able to return to the group on their own using invite links, etc., unless unbanned first. The bot must be an administrator in the chat for this to work and must have the appropriate admin rights. Returns True on success.
	*/
    kickChatMember(
        chat_id,
        user_id,
        until_date
    ) {
        return this.request('kickChatMember', this.buildQuery({
            'chat_id': chat_id,
            'user_id': user_id,
            'until_date': until_date
        }));
    }

	/**
	*Use this method to unban a previously kicked user in a supergroup or channel. The user will not return to the group or channel automatically, but will be able to join via link, etc. The bot must be an administrator for this to work. Returns True on success.
	*/
    unbanChatMember(
        chat_id,
        user_id
    ) {
        return this.request('unbanChatMember', this.buildQuery({
            'chat_id': chat_id,
            'user_id': user_id
        }));
    }

	/**
	*Use this method to restrict a user in a supergroup. The bot must be an administrator in the supergroup for this to work and must have the appropriate admin rights. Pass True for all permissions to lift restrictions from a user. Returns True on success.
	*/
    restrictChatMember(
        chat_id,
        user_id,
        permissions,
        until_date
    ) {
        return this.request('restrictChatMember', this.buildQuery({
            'chat_id': chat_id,
            'user_id': user_id,
            'permissions': permissions,
            'until_date': until_date
        }));
    }

	/**
	*Use this method to promote or demote a user in a supergroup or a channel. The bot must be an administrator in the chat for this to work and must have the appropriate admin rights. Pass False for all boolean parameters to demote a user. Returns True on success.
	*/
    promoteChatMember(
        chat_id,
        user_id,
        can_change_info,
        can_post_messages,
        can_edit_messages,
        can_delete_messages,
        can_invite_users,
        can_restrict_members,
        can_pin_messages,
        can_promote_members
    ) {
        return this.request('promoteChatMember', this.buildQuery({
            'chat_id': chat_id,
            'user_id': user_id,
            'can_change_info': can_change_info,
            'can_post_messages': can_post_messages,
            'can_edit_messages': can_edit_messages,
            'can_delete_messages': can_delete_messages,
            'can_invite_users': can_invite_users,
            'can_restrict_members': can_restrict_members,
            'can_pin_messages': can_pin_messages,
            'can_promote_members': can_promote_members
        }));
    }

	/**
	*Use this method to set a custom title for an administrator in a supergroup promoted by the bot. Returns True on success.
	*/
    setChatAdministratorCustomTitle(
        chat_id,
        user_id,
        custom_title
    ) {
        return this.request('setChatAdministratorCustomTitle', this.buildQuery({
            'chat_id': chat_id,
            'user_id': user_id,
            'custom_title': custom_title
        }));
    }

	/**
	*Use this method to set default chat permissions for all members. The bot must be an administrator in the group or a supergroup for this to work and must have the can_restrict_members admin rights. Returns True on success.
	*/
    setChatPermissions(
        chat_id,
        permissions
    ) {
        return this.request('setChatPermissions', this.buildQuery({
            'chat_id': chat_id,
            'permissions': permissions
        }));
    }

	/**
	*Use this method to generate a new invite link for a chat; any previously generated link is revoked. The bot must be an administrator in the chat for this to work and must have the appropriate admin rights. Returns the new invite link as String on success.Note: Each administrator in a chat generates their own invite links. Bots can't use invite links generated by other administrators. If you want your bot to work with invite links, it will need to generate its own link using exportChatInviteLink — after this the link will become available to the bot via the getChat method. If your bot needs to generate a new invite link replacing its previous one, use exportChatInviteLink again.
	*/
    exportChatInviteLink(
        chat_id
    ) {
        return this.request('exportChatInviteLink', this.buildQuery({
            'chat_id': chat_id
        }));
    }

	/**
	*Use this method to set a new profile photo for the chat. Photos can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate admin rights. Returns True on success.
	*/
    setChatPhoto(
        chat_id,
        photo
    ) {
        return this.request('setChatPhoto', this.buildQuery({
            'chat_id': chat_id,
            'photo': photo
        }));
    }

	/**
	*Use this method to delete a chat photo. Photos can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate admin rights. Returns True on success.
	*/
    deleteChatPhoto(
        chat_id
    ) {
        return this.request('deleteChatPhoto', this.buildQuery({
            'chat_id': chat_id
        }));
    }

	/**
	*Use this method to change the title of a chat. Titles can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate admin rights. Returns True on success.
	*/
    setChatTitle(
        chat_id,
        title
    ) {
        return this.request('setChatTitle', this.buildQuery({
            'chat_id': chat_id,
            'title': title
        }));
    }

	/**
	*Use this method to change the description of a group, a supergroup or a channel. The bot must be an administrator in the chat for this to work and must have the appropriate admin rights. Returns True on success.
	*/
    setChatDescription(
        chat_id,
        description
    ) {
        return this.request('setChatDescription', this.buildQuery({
            'chat_id': chat_id,
            'description': description
        }));
    }

	/**
	*Use this method to pin a message in a group, a supergroup, or a channel. The bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' admin right in the supergroup or 'can_edit_messages' admin right in the channel. Returns True on success.
	*/
    pinChatMessage(
        chat_id,
        message_id,
        disable_notification
    ) {
        return this.request('pinChatMessage', this.buildQuery({
            'chat_id': chat_id,
            'message_id': message_id,
            'disable_notification': disable_notification
        }));
    }

	/**
	*Use this method to unpin a message in a group, a supergroup, or a channel. The bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' admin right in the supergroup or 'can_edit_messages' admin right in the channel. Returns True on success.
	*/
    unpinChatMessage(
        chat_id
    ) {
        return this.request('unpinChatMessage', this.buildQuery({
            'chat_id': chat_id
        }));
    }

	/**
	*Use this method for your bot to leave a group, supergroup or channel. Returns True on success.
	*/
    leaveChat(
        chat_id
    ) {
        return this.request('leaveChat', this.buildQuery({
            'chat_id': chat_id
        }));
    }

	/**
	*Use this method to get up to date information about the chat (current name of the user for one-on-one conversations, current username of a user, group or channel, etc.). Returns a Chat object on success.
	*/
    getChat(
        chat_id
    ) {
        return this.request('getChat', this.buildQuery({
            'chat_id': chat_id
        }));
    }

	/**
	*Use this method to get a list of administrators in a chat. On success, returns an Array of ChatMember objects that contains information about all chat administrators except other bots. If the chat is a group or a supergroup and no administrators were appointed, only the creator will be returned.
	*/
    getChatAdministrators(
        chat_id
    ) {
        return this.request('getChatAdministrators', this.buildQuery({
            'chat_id': chat_id
        }));
    }

	/**
	*Use this method to get the number of members in a chat. Returns Int on success.
	*/
    getChatMembersCount(
        chat_id
    ) {
        return this.request('getChatMembersCount', this.buildQuery({
            'chat_id': chat_id
        }));
    }

	/**
	*Use this method to get information about a member of a chat. Returns a ChatMember object on success.
	*/
    getChatMember(
        chat_id,
        user_id
    ) {
        return this.request('getChatMember', this.buildQuery({
            'chat_id': chat_id,
            'user_id': user_id
        }));
    }

	/**
	*Use this method to set a new group sticker set for a supergroup. The bot must be an administrator in the chat for this to work and must have the appropriate admin rights. Use the field can_set_sticker_set optionally returned in getChat requests to check if the bot can use this method. Returns True on success.
	*/
    setChatStickerSet(
        chat_id,
        sticker_set_name
    ) {
        return this.request('setChatStickerSet', this.buildQuery({
            'chat_id': chat_id,
            'sticker_set_name': sticker_set_name
        }));
    }

	/**
	*Use this method to delete a group sticker set from a supergroup. The bot must be an administrator in the chat for this to work and must have the appropriate admin rights. Use the field can_set_sticker_set optionally returned in getChat requests to check if the bot can use this method. Returns True on success.
	*/
    deleteChatStickerSet(
        chat_id
    ) {
        return this.request('deleteChatStickerSet', this.buildQuery({
            'chat_id': chat_id
        }));
    }

	/**
	*Use this method to send answers to callback queries sent from inline keyboards. The answer will be displayed to the user as a notification at the top of the chat screen or as an alert. On success, True is returned.Alternatively, the user can be redirected to the specified Game URL. For this option to work, you must first create a game for your bot via @Botfather and accept the terms. Otherwise, you may use links like t.me/your_bot?start=XXXX that open your bot with a parameter.
	*/
    answerCallbackQuery(
        callback_query_id,
        text,
        show_alert,
        url,
        cache_time
    ) {
        return this.request('answerCallbackQuery', this.buildQuery({
            'callback_query_id': callback_query_id,
            'text': text,
            'show_alert': show_alert,
            'url': url,
            'cache_time': cache_time
        }));
    }

	/**
	*Use this method to change the list of the bot's commands. Returns True on success.
	*/
    setMyCommands(
        commands
    ) {
        return this.request('setMyCommands', this.buildQuery({
            'commands': commands
        }));
    }

	/**
	*Use this method to get the current list of the bot's commands. Requires no parameters. Returns Array of BotCommand on success.
	*/
    getMyCommands() {
        return this.request('getMyCommands');
    }

	/**
	*Methods and objects used in the inline mode are described in the Inline mode section.
	*
	*Inline mode methods() {
	*}
	*/

}

