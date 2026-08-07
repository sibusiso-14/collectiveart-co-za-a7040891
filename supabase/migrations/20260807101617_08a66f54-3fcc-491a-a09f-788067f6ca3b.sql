CREATE TABLE public.bot_messages (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id text NOT NULL,
  role text NOT NULL,
  content text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE INDEX bot_messages_session_idx ON public.bot_messages (session_id, created_at);

GRANT ALL ON public.bot_messages TO service_role;
ALTER TABLE public.bot_messages ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.customer_enquiries (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id text,
  name text NOT NULL,
  email text,
  phone text,
  designer text,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT ALL ON public.customer_enquiries TO service_role;
ALTER TABLE public.customer_enquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view enquiries"
ON public.customer_enquiries
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

GRANT SELECT ON public.customer_enquiries TO authenticated;

CREATE TRIGGER update_customer_enquiries_updated_at
BEFORE UPDATE ON public.customer_enquiries
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();