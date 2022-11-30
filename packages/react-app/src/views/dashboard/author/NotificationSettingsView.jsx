import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

const NotificationSettingsView = () => {
  return (
    <div className="p-4 sm:p-12 space-y-6 container mx-auto max-w-xl">
      <div className="space-y-2">
        <div className="text-primary font-bold text-lg">Discussions</div>
        <div className="flex flex-row space-x-2 items-center">
          <input id="comments" name="comments" type="checkbox" class="h-4 w-4 rounded border-primary text-primary focus:ring-bgred" />
          <div>When you get a comment on your paper</div>
        </div>
        <div className="flex flex-row space-x-2 items-center">
          <input id="comments" name="comments" type="checkbox" class="h-4 w-4 rounded border-primary text-primary focus:ring-bgred" />
          <div>When you get a like on your paper</div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="text-primary font-bold text-lg">Reviewed</div>
        <div className="flex flex-row space-x-2 items-center">
          <input id="comments" name="comments" type="checkbox" class="h-4 w-4 rounded border-primary text-primary focus:ring-bgred" />
          <div>When you get a review on your paper</div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="text-primary font-bold text-lg">Published</div>
        <div className="flex flex-row space-x-2 items-center">
          <input id="comments" name="comments" type="checkbox" class="h-4 w-4 rounded border-primary text-primary focus:ring-bgred" />
          <div>Your paper gets published</div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="text-primary font-bold text-lg">Papers</div>
        <div className="flex flex-row space-x-2 items-center">
          <input id="comments" name="comments" type="checkbox" class="h-4 w-4 rounded border-primary text-primary focus:ring-bgred" />
          <div>Your paper has been submitted</div>
        </div>
        <div className="flex flex-row space-x-2 items-center">
          <input id="comments" name="comments" type="checkbox" class="h-4 w-4 rounded border-primary text-primary focus:ring-bgred" />
          <div>Your paper has been approved or revised</div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="text-primary font-bold text-lg flex flex-row space-x-2 items-center">
          <span>Epoch</span>
          <ExclamationCircleIcon className="w-5 h-5" />
        </div>
        <div className="flex flex-row space-x-2 items-center">
          <input id="comments" name="comments" type="checkbox" class="h-4 w-4 rounded border-primary text-primary focus:ring-bgred" />
          <div>When Epoch starts</div>
        </div>
        <div className="flex flex-row space-x-2 items-center">
          <input id="comments" name="comments" type="checkbox" class="h-4 w-4 rounded border-primary text-primary focus:ring-bgred" />
          <div>When Epoch ends</div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="text-primary font-bold text-lg">Finance</div>
        <div className="flex flex-row space-x-2 items-center">
          <input id="comments" name="comments" type="checkbox" class="h-4 w-4 rounded border-primary text-primary focus:ring-bgred" />
          <div>When you get tipped</div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettingsView;
